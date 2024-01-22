import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Divider, Modal } from 'semantic-ui-react'
import { getStartYear } from './AnnualValues';


const DistanceFromTop = 10
const DistanceFromRight = 40


const Button1Style = (
    {
        opacity: 0.75,
        position: 'absolute',
        top: DistanceFromTop,
        right: DistanceFromRight,
        zIndex: 100,
    }
)

const Button2Style = (
    {
        opacity: 0.75,
        position: 'absolute',
        top: DistanceFromTop+30,
        right: DistanceFromRight,
        zIndex: 100,
    }
)

const Button3Style = (
    {
        opacity: 0.75,
        position: 'absolute',
        top: DistanceFromTop+60,
        right: DistanceFromRight,
        zIndex: 100,
    }
)

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

const getQuantityDescription = (quantity) => {
    switch (quantity) {
        case 'absolute':
            return (
            <>
                <b>Near-surface air temperature</b> is the temperature
                of the air at 2m above the earth's surface.
            </>
            )
        case 'anomaly':
            return (
            <>
                <b>Near-surface air temperature</b> is the temperature
                of the air at 2m above the earth's surface.
            </>
            )
    }
}

const getVariableDescription = (variable) => {
    switch (variable) {
        case 'air-temperature':
            return (
            <>
                <b>Near-surface air temperature</b> is the temperature
                of the air at 2m above the earth's surface.
            </>
            )
        case 'sea-temperature':
            return (
            <>
                <b>Sea surface temperature</b> is the temperature of the
                water close to the ocean’s surface, in °C. In ERA5, the
                water temperature is estimated at a depth of around 10m.
                This temperature is known as foundation temperature and is
                free of the diurnal cycle.
            </>
            )
    }
    
}


const getDataLink = (variable) => {
    switch (variable) {
        case 'air-temperature':
            return 'https://sites.ecmwf.int/data/c3sci/.climatepulse/data/era5_daily_series_2t_global.csv'
        case 'sea-temperature':
            return 'https://sites.ecmwf.int/data/c3sci/.climatepulse/data/era5_daily_series_sst_60S-60N.csv'
    }
}


const TimeSeriesButtons = () => {
    const variable = useSelector(state => state.variable)
    const quantity = useSelector(state => state.timeSeries.quantity)

    return (
        <Button.Group basic size='small' color='teal'>
        <Button icon href={getDataLink(variable)} color='teal' size='small' ><Icon name="download" /></Button>
        <Button icon color='teal' size='small' ><Icon name="camera" /></Button>
        <Modal
            closeIcon
            size='fullscreen'
            trigger={<Button icon color='teal' size='small' ><Icon name="info" /></Button>}
        >
            <Modal.Header>
                Time series - {getVariable(variable)}
            </Modal.Header>
            <Modal.Content style={{fontSize: 18}}>
                <p>
                <b>What the data shows</b>
                </p>
                <p>
                This chart shows daily averages of global mean
                {getVariable(variable)}<sup>1</sup> {getQuantity(quantity)}<sup>2</sup> from
                the ERA5 global reanalysis dataset, from January
                {getStartYear(variable)} up to two days behind real-time.
                </p>
                <Divider />
                <p>
                <sup>1</sup>{getVariableDescription(variable)}
                </p>

            </Modal.Content>
        </Modal>
        </Button.Group>
    )
}

export default TimeSeriesButtons