import reducer from "../reducer";
import { getStoredState, collectionSeparator } from "../utils";

export default function initialCollectionHandler(store) {
  const separateCollection = collectionSeparator(store);
  const initialCollections = getStoredState(separateCollection);

  return [reducer, initialCollections];
}
