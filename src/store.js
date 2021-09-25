import React, { createContext, useReducer, useMemo } from 'react'

import initializeCollection from './handlers/initializeCollection'

const ContextStore = createContext()

function FluxContextProvider({ store = {}, children }) {
  const [state, dispatch] = useReducer(...initializeCollection(store))

  const contextStore = useMemo(() => [state, dispatch], [state])

  return (
    <ContextStore.Provider value={contextStore}>
      {children}
    </ContextStore.Provider>
  )
}

export { FluxContextProvider, ContextStore }
