import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dimmer, Divider, Loader, Transition, Button, Segment, Icon } from 'semantic-ui-react'
import { updateState, updateGlobe } from "../actions/actions"

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
      rotate: '270deg',
      top: 67,
      right: ((window.innerWidth < 768) ? -90 : -70),
      zIndex: 1000,
  }
)

const switchToTimeSeriesStyle = (
  {
      position: 'absolute',
      rotate: '270deg',
      top: 72,
      left: ((window.innerWidth < 768) ? -96 : -75),
      zIndex: 1000,
  }
)


const MainPanel = () => {
  const dispatch = useDispatch()
  const timeSeriesLoaded = useSelector(state => state.timeSeries.loaded)
  const variable = useSelector(state => state.variable)

  const [mobileVisualisation, setMobileVisualisation] = useState('timeSeries')

  const globeLoaded = useSelector(state => state.globe.loaded)
  const globeTemporalResolution = useSelector(state => state.globe.temporalResolution)
  const globeMinDaily = useSelector(state => state.globe.minDaily)
  const globeMinMonthly = useSelector(state => state.globe.minMonthly)
  const globeMinAnnual = useSelector(state => state.globe.minAnnual)

  const fetchStatus = () => {
    fetch("https://sites.ecmwf.int/data/climatepulse/status/climpulse_status.json")
        .then(resp => resp.json())
        .then((data)=> {
            dispatch(
              updateState({
                maxDate: new Date(data["daily"].toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"))
              })
            )
            dispatch(
              updateGlobe({
                dateTime: new Date(data["daily"].toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")),
                maxDaily: new Date(data["daily"].toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")),
                maxMonthly: new Date(data["monthly"].toString().replace(/(\d{4})(\d{2})/, "$1-$2")),
                maxAnnual: new Date(data["annual"].toString().replace(/(\d{4})/, "$1")),
              })
            )
        })
  }

  useEffect(() => {
      fetchStatus()
  }, [])

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
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
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

      <Dimmer.Dimmable dimmed={!globeLoaded} >
        <Transition visible={!globeLoaded} animation='fade' duration={250}>
        <Dimmer active={!globeLoaded} inverted >
          <Loader size='massive' />
        </Dimmer>
        </Transition>
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
      </Dimmer.Dimmable>
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
                TAP FOR MAP VIEW &nbsp;
                <Icon name='arrow circle down'/>
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
                TAP FOR TIME SERIES &nbsp;
                <Icon name='arrow circle up'/>
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
                TAP FOR MAP VIEW &nbsp;
                <Icon name='arrow circle down'/>
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
                TAP FOR TIME SERIES &nbsp;
                <Icon name='arrow circle up'/>
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