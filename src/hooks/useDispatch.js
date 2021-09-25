import { useContext, useCallback, useRef } from 'react'

import { isItDefenitlyAFunction } from '../helper'
import { ContextStore } from '../store'

export function useDispatch(dispatchCallBack) {
  const isNotInvoked = useRef(true)

  if (isNotInvoked.current) {
    isItDefenitlyAFunction(dispatchCallBack)

    isNotInvoked.current = false
  }

  const [, dispatch] = useContext(ContextStore)

  const _dispatchCallBack = useCallback(
    (...props) => dispatchCallBack(dispatch, ...props),
    []
  )

  return _dispatchCallBack
}
