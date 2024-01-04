import { combineReducers } from 'redux'
import {
    UPDATE_SETTINGS
  } from '../actions/actions'

// these are our initial settings
const initialState = {
  variable: "air-temperature",
  timeseriesType: "absolute",
  globeType: "anomaly",
  globeTime: new Date("2024-01-02"),
  maxDate: new Date("2024-01-02"),
  minDate: new Date("2023-12-01"),
  maxYear: "2022",
  minYear: "1940",
  currentYears: ["2023"],
  resetChart: false,
}

// our reducer constant returning an unchanged or updated state object depending on the users action, many cases will follow
const controls = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
        return {
          ...state,
          settings: action.settings
        }
    default:
      return state
  }
}

// creates a root reducer and combines different reducers if needed
const rootReducer = combineReducers({
  controls
})

export default rootReducer