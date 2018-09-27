import { createSelector } from 'reselect'

const selectCsvDataRowDomain = state => state.get('csvData')

export const selectData = createSelector(selectCsvDataRowDomain, csvData =>
  csvData.get('data'))
