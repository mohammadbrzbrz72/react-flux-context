import { createContext, useReducer, useMemo } from "react";

import initialCollectionHandler from "./handlers/initialCollectionHandler";

const ContextStore = createContext();

function FluxContextProvider({ store = {}, children }) {
  const [state, dispatch] = useReducer(
    ...initialCollectionHandler(store),
  );

  const contextStore = useMemo(() => [state, dispatch], [state]);

  return (
    <ContextStore.Provider value={contextStore}>
      {children}
    </ContextStore.Provider>
  );
}

export { FluxContextProvider, ContextStore };
