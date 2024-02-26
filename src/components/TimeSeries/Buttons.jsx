import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Divider, Modal, Popup } from 'semantic-ui-react'
import { getStartYear } from './AnnualValues';
import { ClickOrTap, ClickOrTouch } from '../TouchContext'


const getVariable = (variableName) => {
    switch (variableName) {
        case 'air-temperature':
            return 'near-surface air temperature'
        case 'sea-temperature':
            return 'sea surface temperature'
    }
}


const getShortName = (variableName) => {
    switch (variableName) {
        case 'air-temperature':
            return '2t'
        case 'sea-temperature':
            return 'sst'
    }
}


const getArea = (variableName) => {
    switch (variableName) {
        case 'air-temperature':
            return 'global'
        case 'sea-temperature':
            return '60S-60N_ocean'
    }
}

const getTsQuantity = (quantity) => {
    switch (quantity) {
        case 'absolute':
            return ''
        case 'anomaly':
            return '_anomaly'
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
    const maxDate = useSelector(state => state.maxDate)

    const getDownloadImageUrl = () => {
        let year = maxDate.getFullYear()
        let month = ('0' + (maxDate.getMonth()+1)).slice(-2)
        let day = ('0' + maxDate.getDate()).slice(-2)

        let timeString = `${year}-${month}-${day}`

        var url = `https://sites.ecmwf.int/data/climatepulse/timeseries/era5_daily_series_${getShortName(variable)}_${getArea(variable)}${getTsQuantity(quantity)}_${timeString}.png`
        return url
    }

    return (
        <Button.Group basic size='small' color='teal'>
        <Popup
          size='small'
          trigger={<Button icon href={getDataLink(variable)} color='teal' size='small' ><Icon name="download" /></Button>}
        >
          Download data (CSV)
        </Popup>
        <Popup
          size='small'
          trigger={ <Button icon color='teal' size='small' href={getDownloadImageUrl()} target="_blank"><Icon name="camera" /></Button>}
        >
          Download image (PNG)
        </Popup>
       
        <Modal
            closeIcon
            size='large'
            trigger={<Button icon color='teal' size='small' ><Icon name="info" /></Button>}
        >
            <Modal.Header>
                Time series - {getVariable(variable)}
            </Modal.Header>
            <Modal.Content style={{fontSize: "1.2rem"}}>
            <p>
            <b>What the data shows</b>
            <br></br>
            This chart shows daily averages of global mean <Popup
                trigger={<u>{getVariable(variable)}</u>}

            >
                {getVariableDescription(variable)}
            </Popup> <Popup
                trigger={<u>{getQuantity(quantity)}</u>}
            >
            {getQuantityDescription(variable, quantity)}
            </Popup> from
            the ERA5 global reanalysis dataset, from January
            {getStartYear(variable)} up to two days behind real-time.
            </p>
            <p>
            <b>How to use this plot</b>
            <ul>
                <li>Hover over a line to see the year and the global average {getVariable(variable)} on the given date</li>
                <li><ClickOrTap capitalise /> on a line to highlight it</li>
                <li>Highlighted lines are coloured from red to blue (hottest to coldest selected years)</li>
                <li>You can also select any number of years to highlight by <ClickOrTap ing/> the <Button basic color='teal' size='mini'>
                    <Icon name='plus'/>Add years to compare with &nbsp;
                    <span style={{color: '#941333', fontWeight: 'bold'}}>
                        {maxDate.getFullYear()}
                    </span>
                </Button> button</li>
                <li><ClickOrTap capitalise/> or double-<ClickOrTap /> on the legend to show and hide lines</li>
                <li><ClickOrTouch capitalise/> and drag on the main plot to zoom in to an area</li>
                <li>Double-<ClickOrTap /> the main plot to reset the zoom level</li>
                <li><ClickOrTap capitalise/> the <Button icon color='teal' size='mini' ><Icon name='undo' /></Button> button to reset the plot</li>
                <li><ClickOrTap capitalise/> the <Button icon basic attached="left" color='teal' size='mini' ><Icon name="download" /></Button> button to download a CSV file containing the data used in this plot</li>
                <li><ClickOrTap capitalise/> the <Button icon basic color='teal' size='mini' ><Icon name="camera" /></Button> button to download this plot as a PNG image</li>
            </ul>
            </p>
            </Modal.Content>
        </Modal>
        </Button.Group>
    )
}

export default TimeSeriesButtons

{/* <p>
<b>Interacting with this plot</b>
<br></br>
Drag to zoom
</p>
<p>
<b>What the data shows</b>
<br></br>
This chart shows daily averages of global mean {getVariable(variable)}<sup>1</sup> {getQuantity(quantity)}<sup>2</sup> from
the ERA5 global reanalysis dataset, from January
{getStartYear(variable)} up to two days behind real-time.
</p>
<Divider />
<p>
<span style={{fontSize: '1rem'}}>
    <sup>1</sup>{getVariableDescription(variable)}
    <br></br>
    <sup>2</sup>{getQuantityDescription(variable, quantity)}
</span>
</p> */}