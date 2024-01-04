import React from 'react'
import { Grid, Container, Header, Divider } from 'semantic-ui-react'
import { ECMWFLogo, C3SLogo, CopernicusLogo, EULogo } from './Logos'

const Footer = () => (
    <Grid centered verticalAlign='middle'>
        <Grid.Row color='black'>
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
        <Grid.Row textAlign='left' color='black'>
        <Grid.Column computer={8} tablet={8} mobile={16}>
            <Container textAlign='left' text inverted>
                <Header inverted as='h3'>Climate Pulse</Header>
                <Divider />
                <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                </p>
            </Container>
            <Divider hidden/>
        </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default Footer