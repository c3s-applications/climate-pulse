import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateState } from "../actions/actions"
import { Button, Menu } from 'semantic-ui-react'

const MainMenu = () => {
  const dispatch = useDispatch()
  const variable = useSelector(state => state.variable)

  return (
    <Button.Group size='large' widths={2} >
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

  // return (
  //   <Menu fluid attached='top' color='purple' size='huge'>
  //     <Menu.Item
  //       name='air-temperature'
  //       content='Air temperature'
  //       active={variable === 'air-temperature'}
  //       onClick={() => dispatch(updateState({variable: 'air-temperature'}))}
  //     />
  //     <Menu.Item
  //       name='sea-temperature'
  //       content='Sea temperature'
  //       active={variable === 'sea-temperature'}
  //       onClick={() => dispatch(updateState({variable: 'sea-temperature'}))}
  //     />
  //   </Menu>
  // )

}

export default MainMenu