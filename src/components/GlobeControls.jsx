import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button, Modal, Icon, Popup, Dropdown } from 'semantic-ui-react'
import Globe from './Globe';


const non31DayMonths = [1, 3, 5, 8, 10]

function GlobeControls(props) {

    const days = [
        {key: 1, text: '1', value: 1},
        {key: 2, text: '2', value: 2},
        {key: 3, text: '3', value: 3},
        {key: 4, text: '4', value: 4},
        {key: 5, text: '5', value: 5},
        {key: 6, text: '6', value: 6},
        {key: 7, text: '7', value: 7},
        {key: 8, text: '8', value: 8},
        {key: 9, text: '9', value: 9},
        {key: 10, text: '10', value: 10},
        {key: 11, text: '11', value: 11},
        {key: 12, text: '12', value: 12},
        {key: 13, text: '13', value: 13},
        {key: 14, text: '14', value: 14},
        {key: 15, text: '15', value: 15},
        {key: 16, text: '16', value: 16},
        {key: 17, text: '17', value: 17},
        {key: 18, text: '18', value: 18},
        {key: 19, text: '19', value: 19},
        {key: 20, text: '20', value: 20},
        {key: 21, text: '21', value: 21},
        {key: 22, text: '22', value: 22},
        {key: 23, text: '23', value: 23},
        {key: 24, text: '24', value: 24},
        {key: 25, text: '25', value: 25},
        {key: 26, text: '26', value: 26},
        {key: 27, text: '27', value: 27},
        {key: 28, text: '28', value: 28},
        {key: 29, text: '29', value: 29, disabled: props.controls.globeTime.getMonth()===1},
        {key: 30, text: '30', value: 30, disabled: props.controls.globeTime.getMonth()===1},
        {key: 31, text: '31', value: 31, disabled: !non31DayMonths.includes(props.controls.globeTime.getMonth())},
    ]

    const months = [
        {key: "jan", text: "January", value: 0, active: props.controls.globeTime.getMonth()===0},
        {key: "feb", text: "February", value: 1, active: props.controls.globeTime.getMonth()===1},
        {key: "mar", text: "March", value: 2, active: props.controls.globeTime.getMonth()===2},
        {key: "apr", text: "April", value: 3, active: props.controls.globeTime.getMonth()===3},
        {key: "may", text: "May", value: 4, active: props.controls.globeTime.getMonth()===4},
        {key: "jun", text: "June", value: 5, active: props.controls.globeTime.getMonth()===5},
        {key: "jul", text: "July", value: 6, active: props.controls.globeTime.getMonth()===6},
        {key: "aug", text: "August", value: 7, active: props.controls.globeTime.getMonth()===7},
        {key: "sep", text: "September", value: 8, active: props.controls.globeTime.getMonth()===8},
        {key: "oct", text: "October", value: 9, active: props.controls.globeTime.getMonth()===9},
        {key: "nov", text: "November", value: 10, active: props.controls.globeTime.getMonth()===10},
        {key: "dec", text: "December", value: 11, active: props.controls.globeTime.getMonth()===11},
    ]

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
                <Popup
                    textAlign='left'
                    on='click'
                    flowing
                    hoverable
                    trigger={
                        <Button size='mini' animated='vertical'>
                            <Button.Content hidden>Calendar</Button.Content>
                            <Button.Content visible>
                                <Icon name='calendar alternate' />
                            </Button.Content>
                        </Button>
                    }
                >
                    <Dropdown
                        options={days}
                        defaultValue={11}
                    />
                    <Dropdown
                        options={months}
                        defaultValue={11}
                    />
                </Popup>
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