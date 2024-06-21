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

import { getAnnualValue } from './TimeSeries/AnnualValues'
import { updateTimeSeries } from "../actions/actions"

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

  let minTemp = Infinity;
  let maxTemp = -Infinity;

  for (let year = 1900; year <= 2100; year++) {
    const annualTemp = getAnnualValue(variable, year);

    if (annualTemp < minTemp) {
      minTemp = annualTemp;
    }

    if (annualTemp > maxTemp) {
      maxTemp = annualTemp;
    }
  }

  const rangeTemp = maxTemp - minTemp;
  console.log('min, max temps', minTemp, maxTemp)
  

  const dateTime = useSelector(state => state.globe.dateTime)
  const year = dateTime.getFullYear();
  // const year = useSelector(state => state.globe.year)  // Somehow use this, and update this value elsewhere? But then what is "dispatch" used for?..
  const yearClamped = (year > 2023) ? 2023 : year;  // Clamp at 2023 as the annual temp for 2024 is undefined
  const annualTemp = getAnnualValue(variable, yearClamped);
  const fractionTemp = (annualTemp - minTemp) / rangeTemp;
  // const pulseDuration = maxPulse - rangePulse * fractionTemp;
  // const pulseDuration = 1;

  // console.log(`Minimum Annual Temperature: ${minTemp}`);
  // console.log(`Maximum Annual Temperature: ${maxTemp}`);
  // console.log(`pulseDuration: ${pulseDuration}, year: ${year}, yearClamped: ${yearClamped}`);

  const globeHighlightYear = useSelector(state => state.timeSeries.globeHighlightYear);
  if (globeHighlightYear !== yearClamped.toString()) {
    // let newHighlightYears = highlightYears.concat(yearClamped.toString())
    dispatch(updateTimeSeries({globeHighlightYear: yearClamped.toString()}))
  }

  // console.log('Year', year, annualTemp)

  // state.timeSeries.  reducers, index.js

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
        <TimeSeriesChart globeYear={yearClamped}/>
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
        <GlobeChart climateScaleFactor={fractionTemp} />
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