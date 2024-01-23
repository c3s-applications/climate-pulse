import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector, useDispatch } from "react-redux"
import * as THREE from 'three'
import { Image, Grid, Button } from 'semantic-ui-react'
import { updateGlobe } from "../../actions/actions"

const globeMaterial = new THREE.MeshBasicMaterial();
new THREE.TextureLoader().load('maps/daily/2t/absolute/map_era5_2t_absolute_global_daily_stripped_20231215.png', texture => {
      globeMaterial.specularMap = texture;
    //   globeMaterial.specular = new THREE.Color('grey');
    //   globeMaterial.shininess = 15;
    });


const defaultPOV = { lat: 52, lng: 16, altitude: 1.62 }

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
    if (window.innerWidth < 991) {
      return Math.min(maxHeight, window.innerWidth-padMobile);
    } else {
      return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
    }
  }

function getHeight() {
    if (window.innerWidth < 768) {
        return 330
    } else {
        return 500
    }
  }

const Chart = () => {

    const dispatch = useDispatch()

    const globeEl = useRef();
    const [setUp, setSetUp] = useState(false);
    const [coastlines, setCoastlines] = useState();

    const [globeImageUrl, setGlobeImageUrl] = useState('https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74167/world.200410.3x5400x2700.jpg');
    const [legendOrientation, setLegendOrientation] = useState((window.innerWidth < 768) ? 'horizontal' : 'horizontal');
  
    const variable = useSelector(state => state.variable);
    const quantity = useSelector(state => state.globe.quantity)
    const temporalResolution = useSelector(state => state.globe.temporalResolution)
    const dateTime = useSelector(state => state.globe.dateTime)

    const padWidescreen = 40
    const padMobile = 80
    const mode = 'adaptive'

    const [width, setWidth] = useState([getWidth(getHeight(), padWidescreen, padMobile, mode)]);

    const shortName = ((variable == 'air-temperature') ? '2t' : 'sst')
    const legendImageUrl = `https://sites.ecmwf.int/data/climatepulse/colourscales/climpulse_colourscale_${temporalResolution}_${shortName}_${quantity}_${legendOrientation}.png`

    function getVariable() {
        if (variable === 'air-temperature') {
            return 'Surface air temperature'
        } else {
            return 'Sea surface temperature'
        }
    }

    function getVariableType() {
        if (quantity === 'absolute') {
            return ''
        } else {
            return 'anomaly '
        }
    }

    function getTimeTitle() {
        switch(temporalResolution) {
            case 'daily':
                return dateTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})
            case 'monthly':
                return dateTime.toLocaleDateString("en-GB", {month: 'long', year: 'numeric'})
            case 'annual':
                return dateTime.toLocaleDateString("en-GB", {year: 'numeric'})
            default:
                return null
        }
    }

    function getTemporalResolution() {
        return temporalResolution.charAt(0).toUpperCase() + temporalResolution.slice(1);
    }

    function getTimeString(year, month, day) {
        switch (temporalResolution) {
            case 'daily':
                return `${year}${month}${day}`
            case 'monthly':
                return `${year}${month}`
            case 'annual':
                return `${year}`
            default:
                
        }
    }

    const updateLegendOrientation = () => {
        if (window.innerWidth < 768) {
            setLegendOrientation('horizontal')
        } else {
            setLegendOrientation('horizontal')
        }
    }

    useEffect(() => {

        if (setUp === false) {
            updateGlobeImage()
            function handleResize(legendUrl) {
                setWidth(getWidth(getHeight(), padWidescreen, padMobile, mode))
                updateLegendOrientation(legendUrl)
            }
            window.addEventListener('resize', handleResize)
            fetch('coastlines.geojson')
                .then(r => r.json())
                .then(cablesGeo => {
                let cablePaths = [];
                cablesGeo.features.forEach(({ geometry, properties }) => {
                    geometry.coordinates.forEach(
                        coords => cablePaths.push({ coords, properties })
                    );
                });
                setCoastlines(cablePaths);
                globeEl.current.pointOfView(defaultPOV);
                });
            setSetUp(true)
        } else {
            updateGlobeImage()
        }
    }, [variable, quantity, dateTime, legendOrientation]);

    const updateGlobeImage = () => {
        let year = dateTime.getFullYear()
        let month = ('0' + (dateTime.getMonth()+1)).slice(-2)
        let day = ('0' + dateTime.getDate()).slice(-2)

        let timeString = getTimeString(year, month, day)

        let yearPath = ((temporalResolution === 'daily') ? `${year}/` : '')

        // var url = `maps/${temporalResolution}/${shortName}/${quantity}/map_era5_${shortName}_${quantity}_global_${temporalResolution}_stripped_${year}${month}${day}.png`

        // var url = `https://sites.ecmwf.int/data/c3sci/.climatepulse/maps/wrap/${temporalResolution}/${shortName}/${quantity}/${yearPath}climpulse_map_era5_${temporalResolution}_wrap_${shortName}_${quantity}_${timeString}.png`
        var url = `https://sites.ecmwf.int/data/climatepulse/maps/wrap/${temporalResolution}/${shortName}/${quantity}/${yearPath}climpulse_map_era5_wrap_${temporalResolution}_${shortName}_${quantity}_${timeString}.png`
        setGlobeImageUrl(url)
    }

    return (
      <>
      <h3
          align="left"
          style={{
              marginLeft: 35,
              marginTop: 19,
              marginBottom: 0,
              fontWeight: "normal",
              fontSize: 18,
              lineHeight: 1,
              color: "#2A3F5F",
          }}
      >
          <b>{getVariable()}</b>
          <br></br>
          <span style={{fontSize: 14}}>{getTemporalResolution()} mean {getVariableType()} - {getTimeTitle()}</span>
          <br></br>
          <span style={{fontSize: 13}}>
          Data: ERA5 ● Credit: C3S/ECMWF
          </span>

      </h3>

      <Grid padded={false} stackable>
            <Grid.Row>
                <Grid.Column width={16} textAlign='center' verticalAlign='middle'>
                <div>
                    <ReactGlobe
                        ref={globeEl}
                        width={width}
                        height={getHeight()}
                        backgroundColor="#ffffff00"
                        pathsData={coastlines}
                        pathPoints="coords"
                        pathPointLat={p => p[1]}
                        pathPointLng={p => p[0]}
                        pathPointAlt={0.001}
                        pathColor={() => ((variable === 'air-temperature') ? '#333' : '#eeeeee')}
                        pathStroke={1}
                        pathTransitionDuration={0}
                        globeMaterial={globeMaterial}
                        // globeImageUrl='maps/daily/2t/absolute/map_era5_2t_absolute_global_daily_stripped_20231215.png'
                        showAtmosphere={true}
                        animateIn={true}
                    />
                </div>

                </Grid.Column>
                <Grid.Column width={16} textAlign='center' verticalAlign='middle'>
                    <Image
                        src={legendImageUrl}
                        verticalAlign='middle'
                        size={(window.innerWidth < 991) ? 'large' : 'large'}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </>
    )
    
}



export default Chart