import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Dimmer, Divider, Loader, Transition, Button, Segment, Icon } from 'semantic-ui-react'

import GlobeMenu from './Globe/Menu'
import GlobeChart from './Globe/Chart'
import GlobeControls from './Globe/Controls'
import GlobeButtons from './Globe/Buttons'

import TimeSeriesMenu from './TimeSeries/Menu'
import TimeSeriesChart from './TimeSeries/Chart'
import TimeSeriesControls from './TimeSeries/Controls'
import TimeSeriesButtons from './TimeSeries/Buttons'


const switchToGlobeStyle = (
  {
      position: 'absolute',
      rotate: '90deg',
      top: 46,
      right: -72,
      zIndex: 1000,
  }
)

const switchToTimeSeriesStyle = (
  {
      position: 'absolute',
      rotate: '90deg',
      top: 61,
      left: -85,
      zIndex: 1000,
  }
)


const MainPanel = () => {
  const timeSeriesLoaded = useSelector(state => state.timeSeries.loaded)
  const variable = useSelector(state => state.variable)

  const [mobileVisualisation, setMobileVisualisation] = useState('timeSeries')

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

  const timeSeriesContent = (
    <>
      <Grid centered>
        <Grid.Column tablet={12} mobile={15}>
          <TimeSeriesMenu />
        </Grid.Column>
      </Grid>

      <Dimmer.Dimmable dimmed={!timeSeriesLoaded} >
        <Transition visible={!timeSeriesLoaded} animation='fade' duration={250}>
        <Dimmer active={!timeSeriesLoaded} inverted >
          <Loader size='massive' />
        </Dimmer>
        </Transition>
        <TimeSeriesChart />
        <TimeSeriesControls />
        <TimeSeriesButtons />
      </Dimmer.Dimmable>
    </>
  )

  const globeContent = (
    <>
      <Grid centered>
        <Grid.Column tablet={12} mobile={15}>
          <GlobeMenu />
        </Grid.Column>
      </Grid>
      <div id='globeContainer'>
        <GlobeChart />
      </div>
      <Divider fitted hidden />
      <Divider fitted hidden />
      <Divider fitted hidden />
      <Divider fitted hidden />
      <Divider fitted hidden />
      <Divider fitted hidden />
      <GlobeControls />
      <GlobeButtons />
    </>
  )

  return (
    <Grid>
      <Grid.Row>

      <Grid.Column widescreen={10} computer={8} only='computer' textAlign="center" >

        <Segment fluid attached color='purple'>
          {timeSeriesContent}
          <Divider fitted hidden />
          <Divider fitted hidden />
          <Divider fitted hidden />
          <Divider fitted hidden />
        </Segment>
        </Grid.Column>
        <Grid.Column widescreen={6} computer={8} only='computer' textAlign="center" verticalAlign="middle" >

        <Segment attached color='purple'>
          {globeContent}
        </Segment>

      </Grid.Column>

        <Grid.Column width={16} only='tablet' textAlign="center" >
          {
            (mobileVisualisation === 'timeSeries') &&
            <>
            <Segment fluid attached color='purple'>
              {timeSeriesContent}
              <Button
                icon
                color='purple'
                attached
                size='medium'
                style={switchToGlobeStyle}
                onClick={() => setMobileVisualisation('globe')}
              >
                <Icon name='arrow circle up'/> &nbsp;
                Tap for globe &nbsp;
              </Button>
            </Segment>
            </>
          }
          {
            (mobileVisualisation === 'globe') &&
            <>
            <Segment fluid attached color='purple'>
              {globeContent}
              <Button
                icon
                color='purple'
                attached
                size='medium'
                style={switchToTimeSeriesStyle}
                onClick={() => setMobileVisualisation('timeSeries')}
              >
                <Icon name='arrow circle down'/>&nbsp;
                Tap for time series &nbsp;
              </Button>
            </Segment>
            </>
          }
        </Grid.Column>


        <Grid.Column width={16} only='mobile' textAlign="center" >
          {
            (mobileVisualisation === 'timeSeries') &&
            <>
            <Segment fluid attached color='purple'>
              {timeSeriesContent}
              <Button
                icon
                color='purple'
                attached
                size='medium'
                style={switchToGlobeStyle}
                onClick={() => setMobileVisualisation('globe')}
              >
                <Icon name='arrow circle up'/> &nbsp;
                Tap for globe &nbsp;
              </Button>
            </Segment>
            </>
          }
          {
            (mobileVisualisation === 'globe') &&
            <>
            <Segment fluid attached color='purple'>
              {globeContent}
              <Button
                icon
                color='purple'
                attached
                size='medium'
                style={switchToTimeSeriesStyle}
                onClick={() => setMobileVisualisation('timeSeries')}
              >
                <Icon name='arrow circle down'/>&nbsp;
                Tap for time series &nbsp;
              </Button>
            </Segment>
            </>
          }
        </Grid.Column>
      </Grid.Row>

    </Grid>
  )
}


export default MainPanel