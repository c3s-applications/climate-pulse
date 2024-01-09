import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector } from "react-redux"
import * as THREE from 'three'
import { Image, Grid } from 'semantic-ui-react'

const globeMaterial = new THREE.MeshBasicMaterial();


function getWidth(maxHeight, padWidescreen, padMobile, mode) {
    if (window.innerWidth < 991) {
      return Math.min(maxHeight, window.innerWidth-padMobile);
    } else {
      return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
    }
  }

function getHeight() {
    if (window.innerWidth < 768) {
        return 320
    } else {
        return 443
    }
  }

const Chart = () => {
    const globeEl = useRef();
    const [setUp, setSetUp] = useState(false);
    const [coastlines, setCoastlines] = useState();  

    const [globeImageUrl, setGlobeImageUrl] = useState();
    const [legendOrientation, setLegendOrientation] = useState((window.innerWidth < 768) ? 'horizontal' : 'vertical');
  
    const variable = useSelector(state => state.variable);
    const quantity = useSelector(state => state.globe.quantity)
    const temporalResolution = useSelector(state => state.globe.temporalResolution)
    const dateTime = useSelector(state => state.globe.dateTime)

    const padWidescreen = 125
    const padMobile = 40
    const mode = 'adaptive'
    const altitude = 1.75

    const [width, setWidth] = useState([getWidth(getHeight(), padWidescreen, padMobile, mode)]);

    const shortName = ((variable == 'air-temperature') ? '2t' : 'sst')
    const legendImageUrl = `https://sites.ecmwf.int/data/c3sci/.climatepulse/colourscales/climpulse_colourscale_${temporalResolution}_${shortName}_${quantity}_${legendOrientation}.png`

    function getVariable() {
        if (variable === 'air-temperature') {
            return 'surface air temperature'
        } else {
            return 'sea surface temperature'
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
        if (window.innerWidth < 768 && legendOrientation === 'vertical') {
            setLegendOrientation('horizontal')
        } else {
            setLegendOrientation('vertical')
        }
    }

    useEffect(() => {
        
        updateGlobeImage()
    
        if (setUp === false) {
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
                });
            globeEl.current.pointOfView({ lat: 52, lng: 16, altitude: altitude });
            setSetUp(true)
        }
    }, [variable, quantity, dateTime, legendOrientation]);

    const updateGlobeImage = () => {
        let year = dateTime.getFullYear()
        let month = ('0' + (dateTime.getMonth()+1)).slice(-2)
        let day = ('0' + dateTime.getDate()).slice(-2)

        let timeString = getTimeString(year, month, day)

        let yearPath = ((temporalResolution === 'daily') ? `${year}/` : '')

        var url = `maps/${temporalResolution}/${shortName}/${quantity}/map_era5_${shortName}_${quantity}_global_${temporalResolution}_stripped_${year}${month}${day}.png`

        // var url = `https://sites.ecmwf.int/data/c3sci/.climatepulse/maps/wrap/${temporalResolution}/${shortName}/${quantity}/${yearPath}climpulse_map_era5_${temporalResolution}_wrap_${shortName}_${quantity}_${timeString}.png`
        setGlobeImageUrl(url)
        // var legendUrl = `https://sites.ecmwf.int/data/c3sci/.climatepulse/colourscales/climpulse_colourscale_${temporalResolution}_${shortName}_${quantity}_${legendOrientation}.png`
        // console.log(legendOrientation)
        // setLegendImageUrl(legendUrl)
    }


    return (
      <>
      <Image src='logos/c3s-mini-positive.png' size='mini' spaced='right' floated='right'/>
      <h3
          align="left"
          style={{
              marginLeft: 35,
              marginTop: 18,
              marginBottom: 0,
              fontWeight: "normal",
              fontSize: 17,
              color: "#2A3F5F",
          }}
      >
          <b>Global {getVariable()} {getVariableType()}- {getTimeTitle()}</b>
          <br></br>
          <sup>
          Data: ERA5 global reanalysis ● Credit: C3S/ECMWF
          </sup>

      </h3>
      <br></br>

      <Grid padded={false} stackable>
            <Grid.Row>
                {/* <Grid.Column width={1} only='computer' textAlign='right' verticalAlign='middle'> */}
                {/* </Grid.Column> */}
                <Grid.Column computer={13} tablet={14} textAlign='right' verticalAlign='middle'>

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
                    pathColor={() => ((variable === 'air-temperature') ? '#888888' : '#eeeeee')}
                    pathStroke={1.25}
                    globeMaterial={globeMaterial}
                    globeImageUrl={globeImageUrl}
                />

                </Grid.Column>
                <Grid.Column computer={3} tablet={2} textAlign='center' verticalAlign='middle'>
                    <Image
                        src={legendImageUrl}
                        verticalAlign='middle'
                        size={(window.innerWidth < 991) ? 'large' : 'tiny'}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </>
    )
    
}



export default Chart