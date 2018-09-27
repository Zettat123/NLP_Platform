import { combineReducers } from 'redux-immutable'
import csvData from './csvData'
import route from './route'

const createReducer = asyncReducers =>
  combineReducers({ route, csvData, ...asyncReducers })

export default createReducer
