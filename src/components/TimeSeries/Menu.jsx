import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateTimeSeries } from "../../actions/actions"
import { Button } from 'semantic-ui-react'

const TimeSeriesMenu = () => {
  const dispatch = useDispatch()
  const quantity = useSelector(state => state.timeSeries.quantity)

  return (
    <Button.Group size='medium' compact widths={2} >
      <Button
        color='teal'
        basic={quantity !== 'absolute'}
        active={quantity === 'absolute'}
        onClick={() => dispatch(updateTimeSeries({quantity: 'absolute'}))}
      >
        Absolute values
      </Button>
      <Button
        color='teal'
        basic={quantity !== 'anomaly'}
        active={quantity === 'anomaly'}
        onClick={() => dispatch(updateTimeSeries({quantity: 'anomaly'}))}
      >
        Anomalies
      </Button>
    </Button.Group>
  );
}

export default TimeSeriesMenu