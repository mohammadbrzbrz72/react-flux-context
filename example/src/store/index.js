import React from 'react'
import { FluxContextProvider } from 'react-flux-context'

import { authState, authReducer } from './reducers/authReducer'
import { userState, usersReducer } from './reducers/usersReducer'

const storeCollection = {
  user: {
    state: userState,
    reducer: usersReducer
  },
  auth: {
    // when you set a local keyword in storage, this state saved or deleted automaticly in localStorage,
    // you can use session keyword, it use sessionStorage
    // * it works like a redux-persist but very easier usage

    state: authState,
    reducer: authReducer,
    storage: 'local', // local | session
    storageKey: '_myAuth_'
  }
}

export default function Provider({ children }) {
  return (
    <FluxContextProvider store={storeCollection}>
      {children}
    </FluxContextProvider>
  )
}
