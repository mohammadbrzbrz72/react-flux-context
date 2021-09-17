export class Storage {
  static getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  static getSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  static setLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static setSession(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  static cache() {}
}

const getStoredDataFromStorage = (storage, storageKey, state) => {
  switch (storage) {
    case "local":
      return Storage.getLocal(storageKey) ?? state;

    case "session":
      return Storage.getSession(storageKey) ?? state;

    case "indexdb":
      return;

    case "cache":
      return;

    default:
      return state;
  }
};

export function getStoredState(collections) {
  const collectionStatesArray = Object.entries(collections.states);

  const getAllStates = collectionStatesArray.map(([key, data]) => {
    const storageData = getStoredDataFromStorage(
      collections.storages[key].storage,
      collections.storages[key].storageKey,
      data,
    );

    return {
      [key]: storageData,
    };
  });

  const newCollection = {
    ...collections,
    states: Object.assign({}, ...getAllStates),
  };

  return newCollection;
}
