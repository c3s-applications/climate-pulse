import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button, Modal, Icon, Popup, Dropdown, Label } from 'semantic-ui-react'
import Globe from './Globe';


const non31DayMonths = [1, 3, 5, 8, 10]

function GlobeControls(props) {

    const days = [
        {key: 1, text: '1', value: 1, disabled: invalidDay(1)},
        {key: 2, text: '2', value: 2, disabled: invalidDay(2)},
        {key: 3, text: '3', value: 3, disabled: invalidDay(3)},
        {key: 4, text: '4', value: 4, disabled: invalidDay(4)},
        {key: 5, text: '5', value: 5, disabled: invalidDay(5)},
        {key: 6, text: '6', value: 6, disabled: invalidDay(6)},
        {key: 7, text: '7', value: 7, disabled: invalidDay(7)},
        {key: 8, text: '8', value: 8, disabled: invalidDay(8)},
        {key: 9, text: '9', value: 9, disabled: invalidDay(9)},
        {key: 10, text: '10', value: 10, disabled: invalidDay(10)},
        {key: 11, text: '11', value: 11, disabled: invalidDay(11)},
        {key: 12, text: '12', value: 12, disabled: invalidDay(12)},
        {key: 13, text: '13', value: 13, disabled: invalidDay(13)},
        {key: 14, text: '14', value: 14, disabled: invalidDay(14)},
        {key: 15, text: '15', value: 15, disabled: invalidDay(15)},
        {key: 16, text: '16', value: 16, disabled: invalidDay(16)},
        {key: 17, text: '17', value: 17, disabled: invalidDay(17)},
        {key: 18, text: '18', value: 18, disabled: invalidDay(18)},
        {key: 19, text: '19', value: 19, disabled: invalidDay(19)},
        {key: 20, text: '20', value: 20, disabled: invalidDay(20)},
        {key: 21, text: '21', value: 21, disabled: invalidDay(21)},
        {key: 22, text: '22', value: 22, disabled: invalidDay(22)},
        {key: 23, text: '23', value: 23, disabled: invalidDay(23)},
        {key: 24, text: '24', value: 24, disabled: invalidDay(24)},
        {key: 25, text: '25', value: 25, disabled: invalidDay(25)},
        {key: 26, text: '26', value: 26, disabled: invalidDay(26)},
        {key: 27, text: '27', value: 27, disabled: invalidDay(27)},
        {key: 28, text: '28', value: 28, disabled: invalidDay(28)},
        {key: 29, text: '29', value: 29, disabled: invalidDay(29)},
        {key: 30, text: '30', value: 30, disabled: invalidDay(30)},
        {key: 31, text: '31', value: 31, disabled: invalidDay(31)},
    ]

    const months = [
        {key: "jan", text: "January", value: 0, active: props.controls.globeTime.getMonth()===0, disabled: invalidMonth(0)},
        {key: "feb", text: "February", value: 1, active: props.controls.globeTime.getMonth()===1, disabled: invalidMonth(1)},
        {key: "mar", text: "March", value: 2, active: props.controls.globeTime.getMonth()===2, disabled: invalidMonth(2)},
        {key: "apr", text: "April", value: 3, active: props.controls.globeTime.getMonth()===3, disabled: invalidMonth(3)},
        {key: "may", text: "May", value: 4, active: props.controls.globeTime.getMonth()===4, disabled: invalidMonth(4)},
        {key: "jun", text: "June", value: 5, active: props.controls.globeTime.getMonth()===5, disabled: invalidMonth(5)},
        {key: "jul", text: "July", value: 6, active: props.controls.globeTime.getMonth()===6, disabled: invalidMonth(6)},
        {key: "aug", text: "August", value: 7, active: props.controls.globeTime.getMonth()===7, disabled: invalidMonth(7)},
        {key: "sep", text: "September", value: 8, active: props.controls.globeTime.getMonth()===8, disabled: invalidMonth(8)},
        {key: "oct", text: "October", value: 9, active: props.controls.globeTime.getMonth()===9, disabled: invalidMonth(9)},
        {key: "nov", text: "November", value: 10, active: props.controls.globeTime.getMonth()===10, disabled: invalidMonth(10)},
        {key: "dec", text: "December", value: 11, active: props.controls.globeTime.getMonth()===11, disabled: invalidMonth(11)},
    ]

    const years = [
        {key: 2023, text: '2023', value: 2023},
        {key: 2024, text: '2024', value: 2024},
    ]

    function invalidDay(day) {
        return (
            (non31DayMonths.includes(props.controls.globeTime.getMonth()) && day===31) ||
            (props.controls.globeTime.getMonth()===1 && day>=29) ||
            (
                (props.controls.globeTime.getFullYear() === props.controls.maxDate.getFullYear()) &&
                (props.controls.globeTime.getMonth() === props.controls.maxDate.getMonth()) &&
                (day > props.controls.maxDate.getDate())
            )
        )
    }

    function invalidMonth(month) {
        return (
            (
                (props.controls.globeTime.getFullYear() === props.controls.maxDate.getFullYear()) &&
                (month > props.controls.maxDate.getMonth())
            )
        )
    }

    function updateMonth(event, data) {
        const { controls } = props
        var month = data.value
        controls.globeTime = new Date(controls.globeTime.getFullYear(), month, controls.globeTime.getDate())
        callUpdateSettings()
    }

    function updateDay(event, data) {
        const { controls } = props
        var day = data.value
        controls.globeTime = new Date(controls.globeTime.getFullYear(), controls.globeTime.getMonth(), day)
        callUpdateSettings()
    }

    function updateYear(event, data) {
        const { controls } = props
        var year = data.value
        controls.globeTime = new Date(year, controls.globeTime.getMonth(), controls.globeTime.getDate())
        callUpdateSettings()
    }

    function setFocus(lat, lon) {
        var globe = document.getElementById("mainGlobe")
        console.log(globe)
    }

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
    
      if (result.getMonth()===1 && result.getDate()===29) {
        if (days < 0) {
            result.setDate(result.getDate() - 1);
        } else {
            result.setDate(result.getDate() + 1);
        }
      }

      if (result > controls.maxDate) {
        result = controls.maxDate
      } else if (result < controls.minDate) {
        result = controls.minDate
      }

      controls.globeTime = result
      callUpdateSettings()
    }

    return (
        <>
            <Button.Group basic size='mini' color='teal'>
                <Button
                    icon
                    disabled={props.controls.globeTime <= props.controls.minDate}
                    onClick={() => incrementTime(-5)}
                >
                    <Icon name='angle double left' />
                    5 days
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime <= props.controls.minDate}
                    onClick={() => incrementTime(-1)}
                >
                    <Icon name='angle left' />
                    1 day
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime >= props.controls.maxDate}
                    onClick={() => incrementTime(1)}
                >
                    1 day
                    <Icon name='angle right' />
                </Button>
                <Button
                    icon
                    disabled={props.controls.globeTime >= props.controls.maxDate}
                    onClick={() => incrementTime(5)}
                >
                    5 days
                    <Icon name='angle double right' />
                </Button>
            </Button.Group>&nbsp;
            <Button.Group size='mini' basic color='teal'>
                <Button
                    size='mini'
                    onClick={() => jumpToDate(props.controls.maxDate)}
                >
                    Latest
                </Button>
                <Popup
                    textAlign='left'
                    on='click'
                    size='mini'
                    flowing
                    hoverable={false}
                    hideOnScroll={false}
                    trigger={
                        <Button size='mini' >
                            Select date
                        </Button>
                    }
                >
                    Select date<br></br>
                    <Dropdown
                        options={days}
                        selection
                        compact
                        pinned
                        defaultValue={props.controls.globeTime.getDate()}
                        onChange={updateDay}
                    />&nbsp;
                    <Dropdown
                        options={months}
                        selection
                        compact
                        pinned
                        defaultValue={props.controls.globeTime.getMonth()}
                        onChange={updateMonth}
                    />&nbsp;
                    <Dropdown
                        options={years}
                        selection
                        compact
                        pinned
                        defaultValue={props.controls.globeTime.getFullYear()}
                        onChange={updateYear}
                    />
                </Popup>
            </Button.Group>
            &nbsp;
            <Modal
                closeIcon
                size='fullscreen'
                trigger={
                    <Button.Group size='mini' color='teal'>
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