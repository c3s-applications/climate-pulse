import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector, connect } from 'react-redux';
import * as THREE from 'three'
import { updateSettings } from "../actions/actions"
import { Image } from 'semantic-ui-react'

const globeMaterial = new THREE.MeshBasicMaterial();

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
  if (window.innerWidth < 768 || mode === 'mobile') {
    return Math.min(maxHeight, window.innerWidth-padMobile);
  } else {
    return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
  }
}


function height() {
  if (window.innerWidth < 768) {
      return 320
  } else {
      return 443
  }
}


function Globe (props) {

  const padWidescreen = 125
  const padMobile = 40
  const mode = 'adaptive'
  const altitude = 1.75

  const globeEl = useRef();
  const [cablePaths, setCablePaths] = useState([]);
  const [width, setWidth] = useState([getWidth(height(), padWidescreen, padMobile, mode)]);
  
  const [globeImageUrl, setGlobeImageUrl] = useState("maps/daily/map_era5_2t_anomaly_global_daily_stripped_20231231.png");

  const variable = useSelector(state => state.controls.variable);
  const prevVariable = useRef();
  const globeType = useSelector(state => state.controls.globeType);
  const prevGlobeType = useRef();

  const globeTime = useSelector(state => state.controls.globeTime);
  const prevglobeTime = useRef();

  const [setUp, setSetUp] = useState(false);

  function callUpdateSettings() {
    const { controls, dispatch } = props

    dispatch(
      updateSettings({
        settings: controls.settings
      })
    )
  }

  function handleUpdateSettings(setting, value) {
      props.controls[setting] = value
      callUpdateSettings()
  }

  function loadGlobe() {
    console.log(1)
    if (!props.controls.globeLoaded) {
      handleUpdateSettings('globeLoaded', true)
    }
  }

  function unloadGlobe() {
    console.log(2)
    console.log(props.controls)
    if (props.controls.globeLoaded) {
      handleUpdateSettings('globeLoaded', false)
    }
  }

  function getImgPath(variable, globeType, date) {
    unloadGlobe()
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth()+1)).slice(-2)
    var day = ('0' + date.getDate()).slice(-2)
  
    if (variable === 'air-temperature') {
      var topLevel = '2t'
    } else {
      var topLevel = 'sst'
    }
    if (globeType === 'absolute') {
      var midLevel = 'absolute'
      var subLevel = 'absolute'
    } else {
      var midLevel = 'anomalies'
      var subLevel = 'anomaly'
    }
  
    var url = `maps/daily/${topLevel}/${midLevel}/map_era5_${topLevel}_${subLevel}_global_daily_stripped_${year}${month}${day}.png`

    return url
  
  }



  useEffect(() => {

    // if (globeTime !== prevglobeTime.current || variable !== prevVariable.current || globeType !== prevGlobeType.current) {
    //     console.log("YO")
    //     // if (props.controls.globeLoaded) {
    //     //   handleUpdateSettings('globeLoaded', false)
    //     // }
    //     prevVariable.current = variable
    //     prevGlobeType.current = globeType
    // }

      if (globeTime !== prevglobeTime.current) {
          setGlobeImageUrl(getImgPath(variable, globeType, globeTime))
          prevglobeTime.current = new Date(globeTime)
      }

      if (setUp === false) {
        function handleResize() {
          setWidth(getWidth(height, padWidescreen, padMobile, mode))
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
    
            setCablePaths(cablePaths);
          });
        globeEl.current.pointOfView({ lat: 52, lng: 16, altitude: altitude });
        setSetUp(true)
      }
    }, [variable, globeType, globeTime]);

    return (
      <>
      <ReactGlobe
        ref={globeEl}
        width={width}
        height={height()}
        backgroundColor="#ffffff00"
        pathsData={cablePaths}
        pathPoints="coords"
        pathPointLat={p => p[1]}
        pathPointLng={p => p[0]}
        pathPointAlt={0.001}
        pathColor={() => '#888888'}
        globeMaterial={globeMaterial}
        globeImageUrl={globeImageUrl}
        // onGlobeReady={globeIsLoaded()}
      />
      <Image id='controlImage' hidden src={globeImageUrl} onLoad={() => loadGlobe()}/>
      </>
    )
    
  }

  const mapStateToProps = state => {
    const controls = state.controls
    return {
        controls
    }
}

export default connect(mapStateToProps)(Globe)