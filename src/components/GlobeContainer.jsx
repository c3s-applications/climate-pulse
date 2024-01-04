
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Image, Grid } from 'semantic-ui-react'
import Globe from './Globe';

function GlobeContainer() {
    const globeTime = new Date(useSelector(state => state.controls.globeTime));
    const [legendSrc, setLegendSrc] = useState(null);

    function defaultGlobeParams() {
        if (window.innerWidth < 768) {
            return {height: 320, altitude: 1.75}
        } else {
            return {height: 443, altitude: 1.75}
        }
    }

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
                <b>Global air temperature anomaly - {globeTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}</b>
                <br></br>
                <sup>
                Data: ERA5 {globeTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'short', year: 'numeric'})} ● Credit: C3S/ECMWF
                </sup>

            </h3>
                <br></br>
            <Grid padded={false} stackable>
            <Grid.Row>
                <Grid.Column width={1} only='computer' textAlign='right' verticalAlign='middle'>
                </Grid.Column>
                <Grid.Column computer={13} tablet={14} textAlign='right' verticalAlign='middle'>
                    <Globe {...defaultGlobeParams()} />
                </Grid.Column>
                <Grid.Column computer={2} textAlign='center' verticalAlign='middle'>
                    <Image
                        src={legendSrc}
                        verticalAlign='middle'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
}

export default GlobeContainer