import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector, useDispatch } from "react-redux"
import * as THREE from 'three'
import { Image, Grid } from 'semantic-ui-react'

const globeMaterial = new THREE.MeshBasicMaterial();

const getShortName = (variable) => {
    switch (variable) {
        case 'air-temperature':
            return '2t'
        case 'sea-temperature':
            return 'sst'
        default:
            return null;
    }
}

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
    if (window.innerWidth < 768 || mode === 'mobile') {
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

    const [globeImageUrl, setGlobeImageUrl] = useState(0);
    const [legendImageUrl, setLegendImageUrl] = useState(0);
  
    const variable = useSelector(state => state.variable);
    const quantity = useSelector(state => state.globe.quantity)
    const temporalResolution = useSelector(state => state.globe.temporalResolution)
    const dateTime = useSelector(state => state.globe.dateTime)

    const padWidescreen = 125
    const padMobile = 40
    const mode = 'adaptive'
    const altitude = 1.75

    const [width, setWidth] = useState([getWidth(getHeight(), padWidescreen, padMobile, mode)]);

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

    useEffect(() => {

        updateGlobeImage()
    
        if (setUp === false) {
        function handleResize() {
            setWidth(getWidth(getHeight(), padWidescreen, padMobile, mode))
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
    }, [variable, quantity, dateTime]);

    const updateGlobeImage = () => {
        let year = dateTime.getFullYear()
        let month = ('0' + (dateTime.getMonth()+1)).slice(-2)
        let day = ('0' + dateTime.getDate()).slice(-2)
        let shortName = getShortName(variable)
        var url = `maps/${temporalResolution}/${shortName}/${quantity}/map_era5_${shortName}_${quantity}_global_${temporalResolution}_stripped_${year}${month}${day}.png`
        setGlobeImageUrl(url)

        var legendUrl = `colourscales/climpulse_colourscale_${temporalResolution}_${shortName}_${quantity}.png`
        console.log(legendUrl)
        setLegendImageUrl(legendUrl)
    }


    return (
      <>
      <h3
          align="left"
          style={{
              marginLeft: 50,
              marginTop: 18,
              marginBottom: 0,
              fontWeight: "normal",
              fontSize: 17,
              color: "#2A3F5F",
          }}
      >
          <b>Global {getVariable()} {getVariableType()}- {dateTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}</b>
          <br></br>
          <sup>
          Data: ERA5 global reanalysis ● Credit: C3S/ECMWF
          </sup>

      </h3>
      <br></br>

      <Grid padded={false} stackable>
            <Grid.Row>
                <Grid.Column width={1} only='computer' textAlign='right' verticalAlign='middle'>
                </Grid.Column>
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
                    globeMaterial={globeMaterial}
                    globeImageUrl={globeImageUrl}
                    // onGlobeReady={globeIsLoaded()}
                />
                </Grid.Column>
                <Grid.Column computer={2} textAlign='center' verticalAlign='middle'>
                    <Image
                        src={legendImageUrl}
                        verticalAlign='middle'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
      {/* <Image id='controlImage' hidden src={globeImageUrl} onLoad={() => loadGlobe()}/> */}
      </>
    )
    
}



export default Chart