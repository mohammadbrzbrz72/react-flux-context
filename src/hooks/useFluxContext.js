import { useContext, useCallback, useRef, useMemo } from 'react'

import {
  isItDefenitlyAFunction,
  isItDefenitlyAFunctionOrNulish
} from '../helper'
import { returnStateByUseSelectorArg } from '../utils'
import { ContextStore } from '../store'

export function useFluxContext(selectorCallback, dispatchCallBack) {
  const isNotInvoked = useRef(true)

  if (isNotInvoked.current) {
    isItDefenitlyAFunctionOrNulish(selectorCallback)
    isItDefenitlyAFunction(dispatchCallBack)

    isNotInvoked.current = false
  }

  const [states, dispatch] = useContext(ContextStore)

  const _dispatchCallBack = useCallback(
    (...props) => dispatchCallBack(dispatch, ...props),
    []
  )

  const context = useMemo(
    () => [
      returnStateByUseSelectorArg(states, selectorCallback),
      _dispatchCallBack
    ],
    [states]
  )

  return context
}
