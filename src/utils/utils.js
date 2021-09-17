export const collectionSeparator = collection => {
  const separateColls = {
    states: {},
    reducers: {},
    storages: {},
  };

  Object.entries(collection).forEach(([key, data]) => {
    separateColls.states[key] = data.state;
    separateColls.reducers[key] = data.reducer;
    separateColls.storages[key] = {
      storage: data.storage,
      storageKey: data.storageKey,
    };
  });

  return separateColls;
};

export const returnStateByUseSelectorArg = (data, callback) => {
  return callback ? callback(data) : data;
};
