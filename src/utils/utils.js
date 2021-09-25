export const collectionSeparator = (collection) => {
  const separateColls = {
    states: {},
    reducers: {}
  }

  Object.entries(collection).forEach(
    ([key, { state, reducer, storage, storageKey }]) => {
      separateColls.states[key] = state
      separateColls.reducers[key] = {
        reducer,
        storage,
        storageKey
      }
    }
  )

  return separateColls
}

export const returnStateByUseSelectorArg = (data, callback) => {
  return callback ? callback(data) : data
}
