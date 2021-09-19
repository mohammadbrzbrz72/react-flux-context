import { useContext, useMemo, useRef } from 'react'

import { isItDefenitlyArrayOfFunction } from '../helper'
import { ContextDisptach } from '../store'

export function useMultiDispatch(dispatchesCallBack) {
  const isNotInvoked = useRef(true)

  if (isNotInvoked.current) {
    isItDefenitlyArrayOfFunction(dispatchesCallBack)

    isNotInvoked.current = false
  }

  const dispatch = useContext(ContextDisptach)

  const _dispatchesCallBack = useMemo(
    () =>
      dispatchesCallBack.map(
        (dispatchCallBack) =>
          (...props) =>
            dispatchCallBack(dispatch, ...props)
      ),
    []
  )

  return _dispatchesCallBack
}
