import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Dimmer, Divider, Loader, Transition } from 'semantic-ui-react'
// import GlobeContainer from './GlobeContainer';
// import GlobeControls from './GlobeControls';
// import GlobeMenu from './GlobeMenu';
// import DownloadGlobe from './DownloadGlobe';
// import DownloadTimeSeries from './DownloadTimeSeries';

import GlobeMenu from './Globe/Menu'
import GlobeChart from './Globe/Chart'
import GlobeControls from './Globe/Controls'
import GlobeDownload from './Globe/Download'

import TimeSeriesMenu from './TimeSeries/Menu'
import TimeSeriesChart from './TimeSeries/Chart'
import TimeSeriesControls from './TimeSeries/Controls'
import TimeSeriesDownload from './TimeSeries/Download'


const MainPanel = () => (
    <Grid columns='equal' celled stackable divided centered >
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <TimeSeriesMenu />
          {/* <Dimmer.Dimmable dimmed={!useSelector(state => state.controls.timeSeriesLoaded)} >
            <Transition visible={!useSelector(state => state.controls.timeSeriesLoaded)} animation='fade' duration={1000}>
            <Dimmer active={!useSelector(state => state.controls.timeSeriesLoaded)} inverted >
              <Loader size='massive' />
            </Dimmer>
            </Transition> */}
            <TimeSeriesChart />
            <TimeSeriesControls />
          {/* </Dimmer.Dimmable> */}
          <Divider />
        <TimeSeriesDownload />
        </Grid.Column>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <GlobeMenu />
          <div id='globeContainer'>
          <GlobeChart />
          </div>
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


export default MainPanel