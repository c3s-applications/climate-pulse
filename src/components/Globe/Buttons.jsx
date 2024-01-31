import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Popup, Modal } from 'semantic-ui-react'
import { ClickOrTap, ClickOrTouch, ScrollOrPinch } from '../TouchContext'


const getVariable = (variableName) => {
    switch (variableName) {
        case 'air-temperature':
            return 'near-surface air temperature'
        case 'sea-temperature':
            return 'sea surface temperature'
    }
}

const getQuantity = (quantity) => {
    switch (quantity) {
        case 'absolute':
            return 'absolute values'
        case 'anomaly':
            return 'anomalies'
    }
}

const getQuantityDescription = (variable, quantity) => {
    switch (quantity) {
        case 'absolute':
            return (
                <>
                    <b>absolute values</b> are the actual temperature in degrees Celsius
                </>
            )
        case 'anomaly':
            return (
                <>
                    <b>anomalies</b> are the difference between the absolute
                    value and a long-term average for the same day or month of
                    the year or for the year as a whole. Here, this long-term
                    average corresponds to the average for the 30-year period
                    1991–2020, the modern standard reference period used by the
                    World Meteorological Organization
                </>
            )
    }
}

const getVariableDescription = (variable) => {
    switch (variable) {
        case 'air-temperature':
            return (
            <>
                <b>near-surface air temperature</b> is the temperature
                of the air at 2m above the earth's surface
            </>
            )
        case 'sea-temperature':
            return (
            <>
                <b>sea surface temperature</b> is the temperature of the
                water close to the ocean’s surface, in °C. In ERA5, the
                water temperature is estimated at a depth of around 10m.
                This temperature is known as foundation temperature and is
                free of the diurnal cycle
            </>
            )
    }
    
}

const GlobeButtons = () => {
    const variable = useSelector(state => state.variable)
    const quantity = useSelector(state => state.globe.quantity)
    const temporalResolution = useSelector(state => state.globe.temporalResolution)

    return (
        <Button.Group basic size='small' attached={false} color='teal'>
        <Popup
          size='small'
          trigger={<Button icon color='teal' size='small' ><Icon name="download" /></Button>}
        >
          Download data (GRIB/NetCDF)
        </Popup>
        <Popup
          size='small'
          trigger={<Button icon color='teal' size='small' ><Icon name="camera" /></Button>}
        >
          Download image (PNG)
        </Popup>
        
        <Modal
            closeIcon
            size='large'
            trigger={<Button icon color='teal' size='small' ><Icon name="info" /></Button>}
        >
            <Modal.Header>
                Map view - {getVariable(variable)}
            </Modal.Header>
            <Modal.Content style={{fontSize: "1.2rem"}}>
            <p>
            <b>What the data shows</b>
            <br></br>
            This chart shows a global map of {temporalResolution} mean <Popup
                trigger={<u>{getVariable(variable)}</u>}

            >
                {getVariableDescription(variable)}
            </Popup> <Popup
                trigger={<u>{getQuantity(quantity)}</u>}
            >
            {getQuantityDescription(variable, quantity)}
            </Popup> from
            the ERA5 global reanalysis dataset. The period of availability depends on the temporal resolution (from January 1979 for monthly and annual data, from January 2023 for daily data). 
            </p>
            <p>
            <b>How to use this plot</b>
            <ul>
                <li><ClickOrTouch capitalise /> and drag the globe to rotate it</li>
                <li><ScrollOrPinch capitalise /> on the globe to zoom in and out</li>
                <li><ClickOrTap capitalise/> the <Button icon basic attached="left" color='teal' size='mini' ><Icon name="angle double left" /></Button> and <Button icon basic color='teal' size='mini' ><Icon name="angle left" /></Button> buttons to step <b>backwards</b> in time by a large or small step, respectively</li>
                <li><ClickOrTap capitalise/> the <Button icon basic color='teal' size='mini' ><Icon name="angle right" /></Button> and <Button icon basic color='teal' attached="right" size='mini' ><Icon name="angle double right" /></Button> buttons to step <b>forwards</b> in time by a small or large step, respectively</li>
                <li><ClickOrTap capitalise/> the dropdown menu to select the temporal aggregation (options are daily, monthly and annual)</li>
                <li><ClickOrTap capitalise/> the <Button basic color='teal' attached="left" size='mini' >Select date</Button> button to manually select a date to visualise on the globe</li>
                <li><ClickOrTap capitalise/> the <Button icon basic attached="left" color='teal' size='mini' ><Icon name="download" /></Button> button to download a CSV file containing the data used in this plot</li>
                <li><ClickOrTap capitalise/> the <Button icon basic color='teal' size='mini' ><Icon name="camera" /></Button> button to download a static PNG image of the data currently visualised on the globe (note that the resulting image will use a Robinson projection instead of a globe perspective)</li>
            </ul>
            </p>
            </Modal.Content>
        </Modal>
        </Button.Group>
    )
}

export default GlobeButtons