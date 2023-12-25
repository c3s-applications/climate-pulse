import React from 'react'
import { connect } from "react-redux"
import { updateSettings } from "../actions/actions"
import { Button } from 'semantic-ui-react'

function Menu(props) {

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
    <Button.Group widths={2} >
      <Button
        active={props.controls.variable === 'air-temperature'}
        onClick={() => handleSettings("variable", 'air-temperature')}
      >
        Air temperature
      </Button>
      <Button
        active={props.controls.variable === 'sea-temperature'}
        onClick={() => handleSettings("variable", 'sea-temperature')}
      >
        Sea temperature
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

export default connect(mapStateToProps)(Menu)