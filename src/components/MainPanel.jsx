import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Dimmer, Divider, Loader, Transition, Header, Icon } from 'semantic-ui-react'

import GlobeMenu from './Globe/Menu'
import GlobeChart from './Globe/Chart'
import GlobeControls from './Globe/Controls'
import GlobeDownload from './Globe/Download'

import TimeSeriesMenu from './TimeSeries/Menu'
import TimeSeriesChart from './TimeSeries/Chart'
import TimeSeriesControls from './TimeSeries/Controls'
import TimeSeriesDownload from './TimeSeries/Download'

const MainPanel = () => {
  const timeSeriesLoaded = useSelector(state => state.timeSeries.loaded)
  const variable = useSelector(state => state.variable)

  const globeTemporalResolution = useSelector(state => state.globe.temporalResolution)
  const globeMinDaily = useSelector(state => state.globe.minDaily)
  const globeMinMonthly = useSelector(state => state.globe.minMonthly)
  const globeMinAnnual = useSelector(state => state.globe.minAnnual)

  const timeSeriesStart = ((variable === 'air-temperature') ? 1940 : 1979)

  const globeStart = (
    (globeTemporalResolution === 'daily') ?
      globeMinDaily.toLocaleString("en-GB", {day: 'numeric', month: 'short', year: 'numeric'}) : 
      (globeTemporalResolution === 'monthly') ? 
        globeMinMonthly.toLocaleString("en-GB", {month: 'short', year: 'numeric'}) : 
        globeMinAnnual.toLocaleDateString("en-GB", {year: 'numeric'})
  )

  return(
    <Grid columns='equal' celled={window.innerWidth >= 768} divided centered >
      <Grid.Row centered>
        <Grid.Column computer={8} tablet={16} textAlign="center">

          <Grid verticalAlign='middle' padded={'horizontally'} centered>
            <Grid.Column floated='left' width={2} />
            <Grid.Column textAlign='center' width={12}>
              <Header as='h3'>Daily averages ({timeSeriesStart}-present)</Header>
            </Grid.Column>
            <Grid.Column textAlign='right' width={2}>
              <Icon name='question circle' size='large' color='grey'/>
            </Grid.Column>
          </Grid>
           
          <Divider />
          <TimeSeriesMenu />
          <Dimmer.Dimmable dimmed={!timeSeriesLoaded} >
            <Transition visible={!timeSeriesLoaded} animation='fade' duration={250}>
            <Dimmer active={!timeSeriesLoaded} inverted >
              <Loader size='massive' />
            </Dimmer>
            </Transition>
            <TimeSeriesChart />
            <TimeSeriesControls />
          </Dimmer.Dimmable>
          <Divider />
        <TimeSeriesDownload />
        </Grid.Column>
        <Grid.Column computer={8} tablet={16} textAlign="center" verticalAlign="middle">

          <Grid centered>
            <Grid.Column floated='left' width={2} />
            <Grid.Column textAlign='center' width={12}>
              <Header as='h3'>{globeTemporalResolution.charAt(0).toUpperCase() + globeTemporalResolution.slice(1)} data ({globeStart}-present)</Header>
            </Grid.Column>
            <Grid.Column textAlign='right' width={2}>
              <Icon name='question circle' size='large' color='grey'/>
            </Grid.Column>
          </Grid>

          <Divider />
          <GlobeMenu />
          <div id='globeContainer'>
          <GlobeChart />
          </div>
          <Divider hidden />
          <GlobeControls />
          <Divider />
        <GlobeDownload />
          {/* <Dimmer.Dimmable dimmed={!useSelector(state => state.controls.globeLoaded)} >
            <Transition visible={!useSelector(state => state.controls.globeLoaded)} animation='fade' duration={500}>
            <Dimmer active={!useSelector(state => state.controls.globeLoaded)} inverted >
              <Loader size='massive' />
            </Dimmer>
            </Transition>
          <GlobeContainer />
          <GlobeControls />
          </Dimmer.Dimmable>
          <Divider />
          <DownloadGlobe /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}


export default MainPanel