
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react'
import Globe from './Globe';

function GlobeContainer() {
    const globeTime = new Date(useSelector(state => state.controls.globeTime));
    const [legendSrc, setLegendSrc] = useState(null);

    useEffect(() => {
        function handleResize () {
            if (window.innerWidth < 768) {
                setLegendSrc('maps/anom-legend-top.png')
            } else {
                setLegendSrc('maps/anom-legend-right.png')
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    });

    return(
        <div id='globeContainer' >
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
            <b>Global air temperature anomaly - {globeTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}</b>
            <br></br>
            <sup>
            Data: ERA5 12 Dec 2023 ● Credit: C3S/ECMWF
            </sup>
        </h3>
        <Image
            src={legendSrc}
            floated='right'
            inline
            verticalAlign='middle'
        />
        <Globe height={462} />
        </div>
    )
}

export default GlobeContainer