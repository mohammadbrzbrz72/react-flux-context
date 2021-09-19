import { Storage } from './utils'

// export default function reducer(collection, { key, type, payload }) {
//   const stateReducer = collection.reducers[key]
//   const state = collection.states[key]
//   const { storage, storageKey } = collection.storages[key]

//   const newState = stateReducer(state, { type, payload })

//   const newCollection = {
//     ...collection,
//     states: {
//       ...collection.states,
//       [key]: newState
//     }
//   }

//   switch (true) {
//     case !storage:
//       break

//     case storage === 'local':
//       Storage.setLocal(storageKey, newState)
//       break

//     case storage === 'session':
//       Storage.setSession(storageKey, newState)
//       break

//     default:
//       throw new Error('Invalid Storage for react-flux-context')
//   }

//   return newCollection
// }

export default function reducersSelector(_reducers) {
  return function reducer(states, { key, type, payload }) {
    const stateReducer = _reducers[key].reducer
    const state = states[key]
    const { storage, storageKey } = _reducers[key].storage

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
