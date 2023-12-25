import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button } from 'semantic-ui-react'

function TimeSeriesMenu(props) {

  function callUpdateSettings() {
    const { controls, dispatch } = props

    dispatch(
      updateSettings({
        settings: controls.settings
      })
    )
  }

  function handleSettings(settingName, setting) {
    const { controls } = props
    controls[settingName] = setting
    callUpdateSettings()
  }

  return (
    <Button.Group basic widths={2} >
      <Button
        active={props.controls.timeseriesType === 'absolute'}
        onClick={() => handleSettings("timeseriesType", 'absolute')}
      >
        Absolute values
      </Button>
      <Button
        active={props.controls.timeseriesType === 'anomaly'}
        onClick={() => handleSettings("timeseriesType", 'anomaly')}
      >
        Anomalies
      </Button>
    </Button.Group>
  );
}

const mapStateToProps = state => {
  const controls = state.controls
  return {
    controls
  }
}

export default connect(mapStateToProps)(TimeSeriesMenu)