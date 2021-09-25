import React from 'react'
import { FluxContextProvider } from 'react-flux-context'

import { auth } from './reducers/authReducer'
import { user } from './reducers/usersReducer'

const storeCollection = {
  user,
  auth
}

export default function Provider({ children }) {
  return (
    <FluxContextProvider store={storeCollection}>
      {children}
    </FluxContextProvider>
  )
}
