import { UPDATE_STATE, UPDATE_TIMESERIES, UPDATE_GLOBE } from '../actions/actions'

const initialState = {
  variable: "air-temperature",
  maxDate: new Date("2024-01-02"),
  minDate: new Date("2023-12-01"),
  timeSeries: {
    quantity: "absolute",
    highlightYears: ["2023"],
    defaultHighlightYears: ["2023"],
    reset: 0,
    loaded: false,
  },
  globe: {
    quantity: "anomaly",
    temporalResolution: "daily",
    dateTime: new Date("2023-12-31"),
    loaded: true,
  },
}

const controls = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
        return {
          ...state,
          ...action,
        }
    case UPDATE_TIMESERIES:
        return {
          ...state,
          timeSeries: {
            ...state.timeSeries,
            ...action,
          }
        }
    case UPDATE_GLOBE:
        return {
          ...state,
          globe: {
            ...state.globe,
            ...action,
          }
        }
    default:
      return state
  }
}

export default controls