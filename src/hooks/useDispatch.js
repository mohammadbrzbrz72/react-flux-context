import { useContext, useCallback, useRef } from 'react'

import { isItDefenitlyAFunction } from '../helper'
import { ContextDisptach } from '../store'

export function useDispatch(dispatchCallBack) {
  const isNotInvoked = useRef(true)

  if (isNotInvoked.current) {
    isItDefenitlyAFunction(dispatchCallBack)

    isNotInvoked.current = false
  }

  const dispatch = useContext(ContextDisptach)

  const _dispatchCallBack = useCallback(
    (...props) => dispatchCallBack(dispatch, ...props),
    []
  )

  console.log('dispatch again')
  return _dispatchCallBack
}
