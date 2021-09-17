import React from 'react'
import { useDispatch } from 'react-flux-context'

import { authLoginAction } from '../store/actions/authAction'

const style = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default function Login() {
  const loginDispatch = useDispatch(authLoginAction)

  return (
    <div style={style.root}>
      <h1>Login user page</h1>
      <button
        onClick={() => {
          loginDispatch()
        }}
      >
        login
      </button>
    </div>
  )
}
