import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateGlobe } from "../../actions/actions"
import { Button } from 'semantic-ui-react'

const GlobeMenu = () => {
  const dispatch = useDispatch()
  const quantity = useSelector(state => state.globe.quantity)

  return (
    <>
    <Button.Group size='medium' compact widths={2} >
      <Button
        fluid
        color='teal'
        basic={quantity !== 'absolute'}
        active={quantity === 'absolute'}
        onClick={() => dispatch(updateGlobe({quantity: 'absolute'}))}
      >
        Absolute values
      </Button>
      <Button
      fluid
        color='teal'
        basic={quantity !== 'anomaly'}
        active={quantity === 'anomaly'}
        onClick={() => dispatch(updateGlobe({quantity: 'anomaly'}))}
      >
        Anomalies
      </Button>
    </Button.Group>
    </>
  );
}

export default GlobeMenu