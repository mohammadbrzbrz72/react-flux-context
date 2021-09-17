import React from 'react'
import { useSelector } from 'react-flux-context'

import LoginPage from '../pages/Login'
import AdminPage from '../pages/admin'

export default function Layout() {
  const { isLogin } = useSelector((data) => data.auth)

  return <div>{isLogin ? <AdminPage /> : <LoginPage />}</div>
}
