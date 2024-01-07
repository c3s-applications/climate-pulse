import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateState } from "../actions/actions"
import { Button } from 'semantic-ui-react'

const Menu = () => {
  const dispatch = useDispatch()
  const variable = useSelector(state => state.variable)

  return (
    <Button.Group widths={2} >
      <Button
        color='purple'
        basic={variable !== 'air-temperature'}
        active={variable === 'air-temperature'}
        onClick={() => dispatch(updateState({variable: 'air-temperature'}))}
      >
        Air temperature
      </Button>
      <Button
        color='purple'
        basic={variable !== 'sea-temperature'}
        active={variable === 'sea-temperature'}
        onClick={() => dispatch(updateState({variable: 'sea-temperature'}))}
      >
        Sea temperature
      </Button>
    </Button.Group>
  );
}

export default Menu