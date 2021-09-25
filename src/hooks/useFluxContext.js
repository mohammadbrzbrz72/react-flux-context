import { useContext, useRef, useMemo } from 'react'

import {
  isItDefenitlyAFunction,
  isItDefenitlyAFunctionOrNulish
} from '../helper'
import { returnStateByUseSelectorArg } from '../utils'
import { ContextStore } from '../store'

export function useFluxContext(selectorCallback, dispatchCallBack) {
  const isNotInvoked = useRef(true)
  const _dispatchCallBack = useRef()

  if (isNotInvoked.current) {
    isItDefenitlyAFunctionOrNulish(selectorCallback)
    isItDefenitlyAFunction(dispatchCallBack)
  }

  const [states, dispatch] = useContext(ContextStore)

  if (isNotInvoked.current) {
    _dispatchCallBack.current = (...props) =>
      dispatchCallBack(dispatch, ...props)

    isNotInvoked.current = false
  }

  const context = useMemo(
    () => [
      returnStateByUseSelectorArg(states, selectorCallback),
      _dispatchCallBack.current
    ],
    [states]
  )

  return context
}
