import React from 'react'
import { Grid, Button, Divider } from 'semantic-ui-react'
import GlobeContainer from './GlobeContainer';
import GlobeControls from './GlobeControls';
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
          {/* <Label size='small'>Compare <b>2023</b></Label> */}
          {/* <Button.Group basic compact size='mini'> */}
            {/* <Button basic compact size='mini'>1940s</Button>
            <Button basic compact size='mini'>1950s</Button>
            <Button basic compact size='mini'>1960s</Button>
            <Button basic compact size='mini'>1970s</Button>
            <Button basic compact size='mini'>1980s</Button>
            <Button basic compact size='mini'>1990s</Button>
            <Button basic compact size='mini'>2000s</Button>
            <Button basic compact size='mini'>2010s</Button>
            <Button basic compact size='mini'>2020s</Button>
            <Button basic compact size='mini' active>1940-2022</Button> */}
          {/* </Button.Group> */}
            <TimeSeriesControls />
          <Divider />
        <DownloadTimeSeries />
        </Grid.Column>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <Button.Group basic widths={2}>
            <Button>Absolute values</Button>
            <Button active>Anomalies</Button>
          </Button.Group>
          <GlobeContainer />
          <GlobeControls />
          <Divider />
          <DownloadGlobe />
        </Grid.Column>
      </Grid.Row>
    </Grid>
)


export default MainPanel