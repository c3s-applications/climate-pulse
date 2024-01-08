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
    maxDaily: new Date("2024-01-05"),
    minDaily: new Date("2023-01-01"),
    maxMonthly: new Date("2023-12-31"),
    minMonthly: new Date("2022-01-01"),
    maxAnnual: new Date("2023-12-31"),
    minAnnual: new Date("1979-01-01"),
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