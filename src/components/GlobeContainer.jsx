
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react'
import Globe from './Globe';

function GlobeContainer() {
    const globeTime = new Date(useSelector(state => state.controls.globeTime));

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
        Data: ERA5 12 Dec 2023 ● Credit: Copernicus Climate Change Service
        & ECMWF
        </sup>
    </h3>
    <Image
        src='maps/anom-legend.png'
        floated='right'
        inline
        verticalAlign='middle'
    />
    <Globe height={459} />
    </div>
    )
}

export default GlobeContainer