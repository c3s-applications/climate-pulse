import React, { useState, useEffect, useRef } from "react"
import ReactGlobe from 'react-globe.gl';
import * as THREE from 'three'

const globeMaterial = new THREE.MeshBasicMaterial();

function getWidth(maxHeight, padWidescreen, padMobile, mode) {
  if (window.innerWidth < 768 || mode === 'mobile') {
    return Math.min(maxHeight, window.innerWidth-padMobile);
  } else {
    return Math.min(maxHeight, (window.innerWidth/2)-padWidescreen);
  }
}

const Globe = ({height, padWidescreen = 195, padMobile = 180, mode = 'adaptive'}) => {
  const globeEl = useRef();
  const [cablePaths, setCablePaths] = useState([]);
  const [width, setWidth] = useState([getWidth(height, padWidescreen, padMobile, mode)]);
  
  useEffect(() => {

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
      globeEl.current.pointOfView({ lat: 52, lng: 16, altitude: 1.65 });
    }, []);


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
        globeImageUrl="test-image.png"
      />
    
  }

export default Globe