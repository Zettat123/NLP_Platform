import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { INITIALIZE, UPDATE_ROW } from 'actions/csvData'

const initialState = fromJS({
  initialData: {},
  keywords: {},
  not_keywords: {},
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
        )
        .set(
          'not_keywords',
          fromJS(Object.keys(data).reduce(
            (acc, cur) => Object.assign({ [cur]: '' }, acc),
            {}
          ))
        ),
    [UPDATE_ROW]: (state, { payload: { number, key, value } }) =>
      state.setIn([key, number], value),
  },
  initialState
)
