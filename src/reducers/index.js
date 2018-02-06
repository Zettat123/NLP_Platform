import { combineReducers } from 'redux-immutable'
import route from './route'

const createReducer = asyncReducers =>
  combineReducers({ route, ...asyncReducers })

export default createReducer
