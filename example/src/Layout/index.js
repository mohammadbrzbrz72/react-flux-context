import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-flux-context'

import LoginPage from '../pages/Login'
import AdminPage from '../pages/Admin'
import { logoutAction } from '../store/actions/authAction'

export default function Layout() {
  const isLogin = false
  const authDispatch = useDispatch(logoutAction)
  const data = useSelector()

  console.log('data user:', data)

  useEffect(() => {
    authDispatch()
  }, [])

  return <div>{isLogin ? <AdminPage /> : <LoginPage />}</div>
}
