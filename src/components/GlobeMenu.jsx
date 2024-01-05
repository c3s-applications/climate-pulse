import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button } from 'semantic-ui-react'

function GlobeMenu(props) {

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
        active={props.controls.globeType === 'absolute'}
        onClick={() => handleSettings("globeType", 'absolute')}
      >
        Absolute values
      </Button>
      <Button
        active={props.controls.globeType === 'anomaly'}
        onClick={() => handleSettings("globeType", 'anomaly')}
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

export default connect(mapStateToProps)(GlobeMenu)