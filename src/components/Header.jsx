/* eslint-disable max-len */

import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ClimatePulseLogo, ECMWFLogo, C3SLogo, CopernicusLogo, EULogo } from './Logos'

const Header = () => (
  <>
    <Grid textAlign='center' stackable centered verticalAlign='middle'>
      <Grid.Row>

        {/* Main Climate Pulse logo */}
        <Grid.Column width={6} textAlign='center' only='computer' >
          <ClimatePulseLogo size='medium' />
        </Grid.Column>
        <Grid.Column width={7} textAlign='center' only='tablet' >
          <ClimatePulseLogo size='medium' />
        </Grid.Column>
        <Grid.Column width={7} textAlign='center' only='mobile' >
          <ClimatePulseLogo size='small' centered />
        </Grid.Column>
  
        {/* Organisation logos */}
        <Grid.Column width={7} only='computer'>
          <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={4}><EULogo size='small' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><CopernicusLogo size='tiny' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><ECMWFLogo size='tiny' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><C3SLogo size='tiny' mode='negative' centered /></Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column width={7} only='tablet'>
          <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={4}><EULogo size='medium' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><CopernicusLogo size='small' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><ECMWFLogo size='small' mode='negative' centered /></Grid.Column>
              <Grid.Column width={4}><C3SLogo size='small' mode='negative' centered /></Grid.Column>
          </Grid>
        </Grid.Column>
  
      </Grid.Row>
    </Grid>
  </>
)

export default Header