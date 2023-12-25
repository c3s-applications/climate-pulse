import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button, Modal, Icon } from 'semantic-ui-react'
import Globe from './Globe';

function GlobeControls(props) {

    function callUpdateSettings() {
      const { controls, dispatch } = props
  
      dispatch(
        updateSettings({
          settings: controls.settings
        })
      )
    }
  
    function jumpToDate(date) {
      const { controls } = props
      controls.globeTime = date
      callUpdateSettings()
    }
  
    function incrementTime(days) {
      const { controls } = props
      
      var result = new Date(controls.globeTime);
      result.setDate(result.getDate() + days);

      if (result > controls.maxDate) {
        result = controls.maxDate
      } else if (result < controls.minDate) {
        result = controls.minDate
      }

      controls.globeTime = result
      console.log(controls.globeTime)
      callUpdateSettings()
    }

    return (
        <>
            <Button.Group basic size='mini' color='grey'>
                <Button
                    icon
                    disabled={props.controls.globeTime <= props.controls.minDate}
                    onClick={() => incrementTime(-5)}
                >
                    <Icon name='angle double left' />
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime <= props.controls.minDate}
                    onClick={() => incrementTime(-1)}
                >
                    <Icon name='angle left' />
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime >= props.controls.maxDate}
                    onClick={() => incrementTime(1)}
                >
                    <Icon name='angle right' />
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime >= props.controls.maxDate}
                    onClick={() => incrementTime(5)}
                >
                    <Icon name='angle double right' />
                </Button>
            </Button.Group>&nbsp;
            <Button.Group basic size='mini' color='grey'>
                <Button
                    size='mini'
                    animated='vertical'
                    onClick={() => jumpToDate(props.controls.maxDate)}
                >
                    <Button.Content hidden>
                        Latest
                    </Button.Content>
                    <Button.Content visible>
                        <Icon name='calendar times' />
                    </Button.Content>
                </Button>
                <Button size='mini' animated='vertical'>
                    <Button.Content hidden>Calendar</Button.Content>
                    <Button.Content visible>
                        <Icon name='calendar alternate' />
                    </Button.Content>
                </Button>
            </Button.Group>
            &nbsp;
            <Modal
                closeIcon
                size='fullscreen'
                trigger={
                    <Button.Group basic size='mini' color='grey'>
                        <Button icon><Icon name='expand' /></Button>
                    </Button.Group>
                }
            >
                <Modal.Header>
                    <b>Global air temperature anomaly - {props.controls.globeTime.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}</b>
                    <br></br>
                    <sup>
                    Data: ERA5 12 Dec 2023 ● Credit: Copernicus Climate Change
                    Service & ECMWF
                    </sup>
                </Modal.Header>
                <Modal.Content>
                    {/* <Image
                        src='maps/anom-legend.png'
                        floated='right'
                        inline
                        verticalAlign='middle'
                    /> */}
                    <Globe
                        height={window.innerHeight-200}
                        padWidescreen={20}
                        padMobile={50}
                        mode='mobile'
                    />
                </Modal.Content>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    const controls = state.controls
    return {
        controls
    }
}

export default connect(mapStateToProps)(GlobeControls)