import React from 'react'

import Layout from './Layout'
import FluxContextProvider from './store'

const App = () => {
  return (
    <FluxContextProvider>
      <Layout />
    </FluxContextProvider>
  )
}

export default App
