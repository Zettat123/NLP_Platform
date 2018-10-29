import { createSelector } from 'reselect'

const selectCsvDataDomain = state => state.get('csvData')

export const selectCsvData = createSelector(selectCsvDataDomain, csvData =>
  csvData.get('data'))

export const selectCsvRow = (state, number) =>
  state
    .get('csvData')
    .get('data')
    .get(number)
