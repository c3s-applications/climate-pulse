import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import { useSelector } from 'react-redux';
import * as THREE from 'three'

const globeMaterial = new THREE.MeshBasicMaterial();

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
  if (window.innerWidth < 768 || mode === 'mobile') {
    return Math.min(maxHeight, window.innerWidth-padMobile);
  } else {
    return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
  }
}

const Globe = ({height, padWidescreen = 125, padMobile = 40, mode = 'adaptive', altitude = 1.75}) => {
  const globeEl = useRef();
  const [cablePaths, setCablePaths] = useState([]);
  const [width, setWidth] = useState([getWidth(height, padWidescreen, padMobile, mode)]);
  
  const [globeImageUrl, setGlobeImageUrl] = useState("https://sites.ecmwf.int/data/c3sci/.climatepulse/maps/wrap/2t/anomalies/map_era5_2t_anomaly_global_daily_stripped_20231215.png");

  const globeTime = useSelector(state => state.controls.globeTime);
  const prevglobeTime = useRef();

  const [setUp, setSetUp] = useState(false);

  useEffect(() => {

      if (globeTime !== prevglobeTime.current) {
          var year = globeTime.getFullYear()
          var month = globeTime.getMonth()
          var day = ('0' + globeTime.getDate()).slice(-2)
          setGlobeImageUrl(`maps/map_era5_2t_anomaly_global_daily_stripped_${year}${month+1}${day}.png`)
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
    });


    return <ReactGlobe
        ref={globeEl}
        width={width}
        height={height}
        backgroundColor="#ffffff00"
        pathsData={cablePaths}
        pathPoints="coords"
        pathPointLat={p => p[1]}
        pathPointLng={p => p[0]}
        pathPointAlt={0.001}
        pathColor={() => '#888888'}
        globeMaterial={globeMaterial}
        globeImageUrl={globeImageUrl}
      />
    
  }

export default Globe