import reducersSelector from '../reducer'
import { getStoredState, collectionSeparator } from '../utils'

export default function initializeCollection(store) {
  const separateCollection = collectionSeparator(store)
  const { reducers, states } = getStoredState(separateCollection)

  return [reducersSelector(reducers), states]
}
