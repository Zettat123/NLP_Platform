import { createAction } from 'redux-actions'

export const INITIALIZE = 'APP/INITIALIZE'
export const initialize = createAction(INITIALIZE, data => data)

export const UPDATE_ROW = 'APP/UPDATE_ROW'
export const updateRow = createAction(UPDATE_ROW, (number, key, value) => ({
  number,
  key,
  value,
}))
