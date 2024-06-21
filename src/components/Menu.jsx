import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateState } from "../actions/actions"
import { Button, Menu } from 'semantic-ui-react'

const MainMenu = () => {
  const dispatch = useDispatch()
  const variable = useSelector(state => state.variable)
  const pulseActive = useSelector(state => state.pulseActive)

  return (
    <div className="menuContainer">
      <div class="centeredElement">
      <Button.Group size='large' widths={1} >
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
        </div>

        <div class="rightElement">
      <Button 
        floated='right'
        toggle
        color='purple'
        basic={!pulseActive}
        active={pulseActive}
        onClick={() => dispatch(updateState({pulseActive: !pulseActive}))}
      >
        <div className='minWidth minHeight centeredDiv'>
        {!pulseActive && ( // Conditionally render if pulseActive is NOT true
          <span class="standard pulse-button-text">Animate?</span>
        )}
          {pulseActive && ( // Conditionally render if pulseActive is true
            <i className="pulse-button-icon">
            <div class="heart-rate">
              <svg version="1.0" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xmlSpace="preserve">
                <polyline fill="none" stroke="white" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                />
              </svg>
              <div class="fade-in"></div>
              <div class="fade-out"></div>
            </div>
            </i>
          )}
          </div>
      </Button>
      
      
      </div>
    </div>
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