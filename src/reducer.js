import { Storage } from './utils'

export default function reducersSelector(_reducers) {
  return function reducer(states, { key, type, payload }) {
    const stateReducer = _reducers[key].reducer
    const state = states[key]
    const { storage, storageKey } = _reducers[key]

    const newState = stateReducer(state, { type, payload })

    const newCollection = {
      ...states,
      [key]: newState
    }

    switch (true) {
      case !storage:
        break

      case storage === 'local':
        Storage.setLocal(storageKey, newState)
        break

      case storage === 'session':
        Storage.setSession(storageKey, newState)
        break

      default:
        throw new Error('Invalid Storage for react-flux-context')
    }

    return newCollection
  }
}
