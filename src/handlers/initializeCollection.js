import reducer from '../reducer'
import { getStoredState, collectionSeparator } from '../utils'

export default function initializeCollection(store) {
  const separateCollection = collectionSeparator(store)
  const initialCollections = getStoredState(separateCollection)

  return [reducer, initialCollections]
}
