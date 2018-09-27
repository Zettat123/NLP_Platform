import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { INITIALIZE, UPDATE_ROW } from 'actions/csvData'

const initialState = fromJS({
  data: {},
})

export default handleActions(
  {
    [INITIALIZE]: (state, { payload: data }) => state.set('data', fromJS(data)),
    [UPDATE_ROW]: (state, { payload: { number, key, value } }) =>
      state.setIn(['data', number, key], value),
  },
  initialState
)
