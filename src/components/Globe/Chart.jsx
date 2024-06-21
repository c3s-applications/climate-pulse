import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector, useDispatch } from "react-redux"
import * as THREE from 'three'
import { Image, Grid, Divider } from 'semantic-ui-react'
import { updateGlobe } from "../../actions/actions"

const globeMaterial = new THREE.MeshBasicMaterial();

const defaultPOV = { lat: 52, lng: 16, altitude: 1.52 }

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
    if (window.innerWidth < 991) {
      return Math.min(maxHeight, window.innerWidth-padMobile);
    } else {
      return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
    }
  }


  function getHeight() {
    if (window.innerWidth < 768) {
        return 300
    } else {
        return 505
    }
  }

const Chart = ({climateScaleFactor}) => {

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
    const pulseActive = useSelector(state => state.pulseActive)

    const padWidescreen = 40
    const padMobile = 80
    const mode = 'adaptive'

    const [width, setWidth] = useState([getWidth(getHeight(), padWidescreen, padMobile, mode)]);

    let atmosphereColor = getColor(climateScaleFactor)

    const minPulse = 0.35;  // Duration of hearbeat (0.25 = 240bps [dead])
    const maxPulse = 2;   // 40 bps
    const rangePulse = maxPulse - minPulse;
    let pulseDuration = maxPulse - rangePulse * climateScaleFactor;  // Inverted (shorter duration is faster pulse)
    const pulseClassName = pulseActive ?"pulse-effect" : ""

    const shortName = ((variable == 'air-temperature') ? '2t' : 'sst')
    const legendImageUrl = `https://sites.ecmwf.int/data/climatepulse/colourscales/climpulse_colourscale_${temporalResolution}_${shortName}_${quantity}_${legendOrientation}.png`

    function getColor(value) {
        // Ensure the value is between 0 and 1
        if (value < 0) value = 0;
        if (value > 1) value = 1;

        // Calculate the alpha value based on the input. Apparently this doesn't work (globe.gl ignores alpha channel?)
        let alpha = 1;
        const red = Math.floor(255 * value);
        const blue = 255 - Math.floor(255 * value);
        console.log('getColor', red, blue, alpha)

        // Define the red color with variable transparency
        // Red color in RGB is (255, 0, 0)
        return `rgba(${red}, 0, 0, ${alpha})`;
    }

    function getVariable() {
        if (variable === 'air-temperature') {
            if (quantity === 'absolute') {
                return 'Surface air temperature'
            } else {
                return 'Surface air temperature anomaly'
            }
        } else {
            if (quantity === 'absolute') {
                return `Sea surface temperature`
            } else {
                return `Sea surface temperature anomaly`
            }
        }
    }
    
    function getSecondLineExtra() {
        if (quantity === 'absolute') {
            return ' ● Data ERA5'
        } else {
            return ' ● Baseline: 1991-2020'
        }
    }
    function getThirdLineExtra() {
        if (quantity === 'absolute') {
            return ''
        } else {
            return 'Data: ERA5 ● '
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
                return dateTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'short', year: 'numeric'})
            case 'monthly':
                return dateTime.toLocaleDateString("en-GB", {month: ((window.innerWidth < 768) ? 'short' : 'long'), year: 'numeric'})
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
                console.log(cablePaths);
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
      <Divider compact hidden />
              <Grid>
            <Grid.Row verticalAlign="middle">
                <Grid.Column textAlign="center">
                <h3
                    align="center"
                    style={{
                        fontWeight: "normal",
                        fontSize: 18,
                        lineHeight: 1.2,
                        color: "#2A3F5F",
                        marginBottom: "-10px",
                        padding: "0px",
                    }}
                >
                {window.innerWidth >= 768 &&
                    <>
                    <b>{getVariable()} ● {getTimeTitle()}</b>
                    <br></br>
                        <span style={{fontSize: 16}}>{getTemporalResolution()} average{getSecondLineExtra()}</span>
                        <br></br>
                        <span style={{fontSize: 16}}>
                        {getThirdLineExtra()}Credit: C3S/ECMWF
                        </span>
                    </>
                }
                {window.innerWidth < 768 &&
                    <>
                    <b>{getTimeTitle()}</b><br></br>
                    <b>{getVariable()}</b>
                    <br></br>
                        <span style={{fontSize: 16}}>{getTemporalResolution()} average{getSecondLineExtra()}</span>
                        <br></br>
                        <span style={{fontSize: 16}}>
                        {getThirdLineExtra()}Credit: C3S/ECMWF
                        </span>
                    </>
                }

                </h3>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16} textAlign='center' verticalAlign='middle'>
                <div style={{ '--animation-duration': pulseDuration + 's' }} className={pulseClassName}>
                    <ReactGlobe
                        ref={globeEl}
                        width={width}
                        height={getHeight()}
                        backgroundColor="#ffffff00"
                        atmosphereAltitude={0.1}
                        pathsData={coastlines}
                        pathPoints="coords"
                        pathPointLat={p => p[1]}
                        pathPointLng={p => p[0]}
                        pathPointAlt={0.001}
                        pathColor={() => ((variable === 'air-temperature') ? '#333' : '#eeeeee')}
                        pathStroke={1}
                        pathTransitionDuration={0}
                        globeMaterial={globeMaterial}
                        globeImageUrl={globeImageUrl}
                        showAtmosphere={true}
                        atmosphereColor={atmosphereColor}
                        // animateIn={true}
                    />
                </div>
                </Grid.Column>
                <Grid.Column width={16} textAlign='center' verticalAlign='middle'>
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
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