import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { INITIALIZE, UPDATE_ROW } from 'actions/csvData'

const initialState = fromJS({
  initialData: {},
  keywords: {},
})

export default handleActions(
  {
    [INITIALIZE]: (state, { payload: data }) =>
      state
        .set('initialData', fromJS(data))
        .set(
          'keywords',
          fromJS(Object.keys(data).reduce(
            (acc, cur) => Object.assign({ [cur]: '' }, acc),
            {}
          ))
        ),
    [UPDATE_ROW]: (state, { payload: { number, value } }) =>
      state.setIn(['keywords', number], value),
  },
  initialState
)
