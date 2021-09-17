import { Storage } from './utils'

export default function reducer(collection, { key, type, payload }) {
  const stateReducer = collection.reducers[key]
  const state = collection.states[key]
  const { storage, storageKey } = collection.storages[key]

  // console.log(type, "start collection:", collection);
  const newState = stateReducer(state, { type, payload })

  const newCollection = {
    ...collection,
    states: {
      ...collection.states,
      [key]: newState
    }
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

    case storage === 'cache':
      break

    case storage === 'indexdb':
      break

    default:
      throw new Error('Invalid Storage for react-flux-context')
  }

  // console.log(type, "end collection:", newCollection);

  return newCollection
}
