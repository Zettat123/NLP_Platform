import { injectAsyncReducer } from 'app/store'

/**
 * @param reducers - {reducerName: () => System.import('reducer path'))}
 */
const injectReducers = reducers =>
  Promise.all(
    Object.keys(reducers).map(name =>
      reducers[name]().then(reducer =>
        injectAsyncReducer(name, reducer.default || reducer))
      )
  )

/**
 * Lazy load component and inject async reducers
 *
 * @param importComponent - () => System.import('component path')
 * @param reducers - {reducerName: () => System.import('reducer path'))}
 */
export default (importComponent, reducers = {}) =>
  (location, callback) =>
    Promise.all([
      importComponent(),
      injectReducers(reducers),
    ]).then(([
      component,
    ]) => callback(null, component.default))
