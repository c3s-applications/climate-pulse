import React from 'react'
import { Grid, Button, Divider } from 'semantic-ui-react'
import GlobeContainer from './GlobeContainer';
import GlobeControls from './GlobeControls';
import GlobeMenu from './GlobeMenu';
import TimeSeries from './TimeSeries';
import DownloadGlobe from './DownloadGlobe';
import DownloadTimeSeries from './DownloadTimeSeries';
import TimeSeriesMenu from './TimeSeriesMenu';
import TimeSeriesControls from './TimeSeriesControls';


const MainPanel = () => (
    <Grid columns='equal' celled stackable divided centered >
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <TimeSeriesMenu />
          <TimeSeries />
            <TimeSeriesControls />
          <Divider />
        <DownloadTimeSeries />
        </Grid.Column>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <GlobeMenu />
          <GlobeContainer />
          <GlobeControls />
          <Divider />
          <DownloadGlobe />
        </Grid.Column>
      </Grid.Row>
    </Grid>
)


export default MainPanel