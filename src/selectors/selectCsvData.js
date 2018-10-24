import { createSelector } from 'reselect'

const selectCsvDataRowDomain = state => state.get('csvData')

export const selectInitialData = createSelector(
  selectCsvDataRowDomain,
  csvData => csvData.get('initialData')
)

export const selectAllKeywords = createSelector(
  selectCsvDataRowDomain,
  csvData => csvData.get('keywords')
)

export const selectAllNotKeywords = createSelector(
  selectCsvDataRowDomain,
  csvData => csvData.get('not_keywords')
)

export const selectRow = (state, number) =>
  state
    .get('csvData')
    .get('initialData')
    .get(number)

export const selectKeywords = (state, number) =>
  state
    .get('csvData')
    .get('keywords')
    .get(number)

export const selectNotKeywords = (state, number) =>
  state
    .get('csvData')
    .get('not_keywords')
    .get(number)
