import React, { useEffect } from 'react'
import { useFluxMultiContext } from 'react-flux-context'

import { logoutAction } from '../store/actions/authAction'
import { userAction } from '../store/actions/userAction'

export default function AdminPage() {
  // first param: useSelector role = set nullish param or use selector func: data => data
  // second params: like a useMultiDispatch role

  const [data, dispatches] = useFluxMultiContext(undefined, [
    logoutAction,
    userAction
  ])
  const [logoutDispatch, userDispatch] = dispatches

  useEffect(() => {
    userDispatch()
  }, [])

  return (
    <div>
      <button onClick={() => logoutDispatch()}>
        {data.auth.loading ? 'loading...' : 'sign out'}
      </button>
      <h1>hello to admin page</h1>
      <br />
      <br />
      <br />
      {data.user.loading
        ? 'please wait to get users...'
        : data.user.users.map(({ id, fullname, age, email, isMarried }) => (
            <ul key={id}>
              <li>fullname: {fullname} </li>
              <li>age: {age} </li>
              <li>email: {email} </li>
              <li>isMarried: {isMarried}</li>
            </ul>
          ))}
    </div>
  )
}
