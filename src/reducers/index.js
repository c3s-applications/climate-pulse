import { UPDATE_STATE, UPDATE_TIMESERIES, UPDATE_GLOBE } from '../actions/actions'

import latestState from './status.json';

const maxDaily = latestState["daily"].toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
const maxMonthly = latestState["monthly"].toString().replace(/(\d{4})(\d{2})/, "$1-$2");
const maxAnnual = latestState["annual"].toString().replace(/(\d{4})/, "$1");


const initialState = {
  variable: "air-temperature",
  maxDate: new Date(maxDaily),
  minDate: new Date("2023-12-01"),
  pulseActive: false,
  timeSeries: {
    quantity: "absolute",
    highlightYears: ["2023"],
    defaultHighlightYears: ["2023"],
    globeHighlightYear: "2023",
    reset: 0,
    loaded: false,
    minMaxVals: [13.52, 14.99],
  },
  globe: {
    quantity: "anomaly",
    temporalResolution: "daily",
    dateTime: new Date(maxDaily),
    year: new Date(maxDaily).getFullYear(),
    loaded: true,
    maxDaily: new Date(maxDaily),
    minDaily: new Date("2023-01-01"),
    maxMonthly: new Date(maxMonthly),
    minMonthly: new Date("1979-01-15"),
    maxAnnual: new Date(maxAnnual),
    minAnnual: new Date("1979-06-01"),
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