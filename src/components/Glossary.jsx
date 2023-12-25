import React, { useState } from 'react'
import { Segment, Button, Icon, Modal, Menu, Grid } from 'semantic-ui-react'

const AnomalyDefinition = () => (
    <p>
    In climatology, an <b>anomaly</b> is the difference compared to a long-term
    average.
    </p>
)

const AirTemperatureDefinition = () => (
    <p>
    Air temperature refers to the temperature of air at 2m above the surface of
    land, sea or inland waters.
    </p>
)

const SeaTemperatureDefinition = () => (
    <p>
    Sea temperature refers to the temperature of sea water near the surface.
    </p>
)

const ReanalysisDefinition = () => (
    <p>
    Climate reanalyses combine past observations with models to generate
    consistent time series of multiple climate variables. Reanalyses are among
    the most-used datasets in the geophysical sciences. They provide a
    comprehensive description of the observed climate as it has evolved during
    recent decades, on 3D grids at sub-daily intervals. 
    </p>
)

const ERA5Definition = () => (
    <p>
    <b>ERA5</b> is the fifth generation ECMWF reanalysis for the global climate
    and weather for the past 8 decades. Data is available from 1940 onwards.
    </p>
)

function Glossary () {
    const [glossaryItem, setGlossaryItem] = useState('anomaly');
    const handleItemClick = (e, { name }) => setGlossaryItem( name )

    return (
        <Modal
            closeIcon
            trigger={<Button><Icon name='book'/>Glossary</Button>}
        >
            <Modal.Header><Icon name='book'/>Glossary</Modal.Header>
            <Modal.Content>
                <Grid>
                    <Grid.Column computer={4} tablet={4} mobile={6}>
                        <Menu fluid vertical pointing >
                            <Menu.Item
                                name='anomaly'
                                content='Anomaly'
                                active={glossaryItem === 'anomaly'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='air-temperature'
                                content='Air temperature'
                                active={glossaryItem === 'air-temperature'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='sea-temperature'
                                content='Sea temperature'
                                active={glossaryItem === 'sea-temperature'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='reanalysis'
                                content='Reanalysis'
                                active={glossaryItem === 'reanalysis'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='era5'
                                content='ERA5'
                                active={glossaryItem === 'era5'}
                                onClick={handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched computer={12} tablet={12} mobile={10}>
                        <Segment>
                        {glossaryItem === 'anomaly' && <AnomalyDefinition />}
                        {glossaryItem === 'air-temperature' && <AirTemperatureDefinition />}
                        {glossaryItem === 'sea-temperature' && <SeaTemperatureDefinition />}
                        {glossaryItem === 'reanalysis' && <ReanalysisDefinition />}
                        {glossaryItem === 'era5' && <ERA5Definition />}
                        </Segment>
                    </Grid.Column>
                </Grid>

            </Modal.Content>
        </Modal>
    )
}

export default Glossary