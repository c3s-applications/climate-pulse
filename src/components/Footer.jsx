import React from 'react'
import { Grid, Container, Header, Divider } from 'semantic-ui-react'
import { ECMWFLogo, C3SLogo, CopernicusLogo, EULogo } from './Logos'

const Footer = () => (
    <Grid centered verticalAlign='middle'>
        <Grid.Row color='purple'>
        <Grid.Column computer={3} textAlign='left' mobile={4}>
            <EULogo mode='negative' size='medium' centered/>
        </Grid.Column>
        <Grid.Column computer={3} textAlign='center' mobile={4}>
            <CopernicusLogo mode='negative' size='small' centered/>
        </Grid.Column>
        <Grid.Column computer={3} textAlign='center' mobile={4}>
            <ECMWFLogo mode='negative' size='small' centered/>
        </Grid.Column>
        <Grid.Column computer={3} textAlign='right' mobile={4}>
            <C3SLogo mode='negative' size='small' centered/>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign='left' color='purple'>
        <Container textAlign='left' text inverted>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                    <Header inverted as='h3'>Climate Pulse</Header>
                    <Divider />
                    <p>
                    The Copernicus Climate Change Service (C3S), implemented by the
                    European Centre for Medium-Range Weather Forecasts (ECMWF)
                    on behalf of the European Commission is part of the European Union's space programme.
                    </p>
                <Divider hidden/>
            </Grid.Column>
        </Container>
        </Grid.Row>

        <Grid.Row />
        <Grid.Row>
        <Grid.Column computer={2} textAlign='left' mobile={5}>
            <Header href="https://climate.copernicus.eu/about-us" color="purple">About us</Header>
        </Grid.Column>
        <Grid.Column computer={2} textAlign='center' mobile={5}>
            <Header href="https://confluence.ecmwf.int/site/support" color="purple">Contact us</Header>
        </Grid.Column>
        <Grid.Column computer={2} textAlign='center' mobile={5}>
            <Header href="https://climate.copernicus.eu/data-protection-and-privacy-statement" color="purple">Privacy</Header>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row />

    </Grid>
)

export default Footer