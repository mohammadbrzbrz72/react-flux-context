import React, { createContext, useReducer, useMemo } from 'react'

import initializeCollection from './handlers/initializeCollection'

const ContextStore = createContext()
const ContextDisptach = createContext()

function FluxContextProvider({ store = {}, children }) {
  const [state, dispatch] = useReducer(...initializeCollection(store))

  const contextStore = useMemo(() => [state, dispatch], [state])

  return (
    <ContextStore.Provider value={contextStore}>
      <ContextDisptach.Provider value={dispatch}>
        {children}
      </ContextDisptach.Provider>
    </ContextStore.Provider>
  )
}

export { FluxContextProvider, ContextStore, ContextDisptach }
