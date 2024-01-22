import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Divider, Modal } from 'semantic-ui-react'


const CdsUrl = 'https://cds.climate.copernicus.eu/cdsapp#!/dataset/'
const era5HourlyURL = CdsUrl + 'reanalysis-era5-single-levels'
const era5MonthlyURL = CdsUrl + 'reanalysis-era5-single-levels-monthly-means'

const DistanceFromTop = 65
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

const GlobeButtons = () => {
    const variable = useSelector(state => state.variable)

    return (
        <Button.Group basic size='small' attached={false} color='teal'>
        <Button icon color='teal' size='small' ><Icon name="download" /></Button>
        <Button icon color='teal' size='small' ><Icon name="camera" /></Button>
        <Modal
            closeIcon
            size='fullscreen'
            trigger={<Button icon color='teal' size='small' ><Icon name="info" /></Button>}
        >
            <Modal.Header>
                Globe - {getVariable(variable)}
            </Modal.Header>
            <Modal.Content>
                ERA5 gridded reanalysis data is available through the Copernicus
                Climate Change Service (C3S) Climate Data Store (CDS), from 1940
                to present (with a five-day delay).
                <br></br><br></br>
                The CDS provides ERA5 datasets on monthly and hourly
                aggregations for a wide range of variables.
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='purple'
                    onClick={() => window.open(era5HourlyURL, '_blank').focus()}
                >
                ERA5 hourly
                </Button>
                <Button
                    color='purple'
                    onClick={() => window.open(era5MonthlyURL, '_blank').focus()}
                >
                ERA5 monthly
                </Button>
            </Modal.Actions>
        </Modal>
        </Button.Group>
    )
}

export default GlobeButtons