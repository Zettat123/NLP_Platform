import { createSelector } from 'reselect'

const selectCsvDataRowDomain = state => state.get('csvData')

export const selectData = createSelector(selectCsvDataRowDomain, csvData =>
  csvData.get('initialData'))

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
