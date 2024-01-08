export const UPDATE_STATE = 'UPDATE_STATE'
export const UPDATE_TIMESERIES = 'UPDATE_TIMESERIES'
export const UPDATE_GLOBE = 'UPDATE_GLOBE'

export const updateState = payload => ({
  type: UPDATE_STATE,
  ...payload
})

export const updateTimeSeries = payload => ({
  type: UPDATE_TIMESERIES,
  ...payload
})

export const updateGlobe = payload => ({
  type: UPDATE_GLOBE,
  ...payload
})