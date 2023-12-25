export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const updateSettings = payload => ({
    type: UPDATE_SETTINGS,
    ...payload
  })