/* eslint-disable max-len */

import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ClimatePulseLogo, ECMWFLogo, C3SLogo, CopernicusLogo, EULogo } from './Logos'

const Header = () => (
  <>
    <Grid textAlign='center' stackable centered verticalAlign='middle'>
      <Grid.Row>

        {/* Main Climate Pulse logo */}
        <Grid.Column width={7} textAlign='center' only='computer' >
          <ClimatePulseLogo size='medium' />
        </Grid.Column>
        <Grid.Column width={7} textAlign='center' only='tablet' >
          <ClimatePulseLogo size='medium' />
        </Grid.Column>
        <Grid.Column width={7} textAlign='center' only='mobile' >
          <ClimatePulseLogo size='medium' centered />
        </Grid.Column>
  
        {/* Organisation logos */}
        <Grid.Column width={7} only='computer'>
          <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={4}><EULogo size='medium' centered /></Grid.Column>
              <Grid.Column width={4}><CopernicusLogo size='small' centered /></Grid.Column>
              <Grid.Column width={4}><ECMWFLogo size='small' centered /></Grid.Column>
              <Grid.Column width={4}><C3SLogo size='small' centered /></Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column width={7} only='tablet'>
          <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={4}><EULogo size='medium' centered /></Grid.Column>
              <Grid.Column width={4}><CopernicusLogo size='small' centered /></Grid.Column>
              <Grid.Column width={4}><ECMWFLogo size='small' centered /></Grid.Column>
              <Grid.Column width={4}><C3SLogo size='small' centered /></Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column width={7} only='mobile'>
          <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={3}><EULogo size='small' centered /></Grid.Column>
              <Grid.Column width={3}><CopernicusLogo size='tiny' centered /></Grid.Column>
              <Grid.Column width={3}><ECMWFLogo size='tiny' centered /></Grid.Column>
              <Grid.Column width={3}><C3SLogo size='tiny' centered /></Grid.Column>
          </Grid>
        </Grid.Column>
  
      </Grid.Row>
    </Grid>
  </>
)

export default Header