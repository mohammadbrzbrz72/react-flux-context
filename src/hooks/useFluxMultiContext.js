import { useContext, useRef, useMemo } from 'react'

import {
  isItDefenitlyAFunctionOrNulish,
  isItDefenitlyArrayOfFunction
} from '../helper'
import { returnStateByUseSelectorArg } from '../utils'
import { ContextStore } from '../store'

export function useFluxMultiContext(selectorCallback, dispatchesCallBack) {
  const isNotInvoked = useRef(true)
  const _dispatchesCallBack = useRef()

  if (isNotInvoked.current) {
    isItDefenitlyAFunctionOrNulish(selectorCallback)
    isItDefenitlyArrayOfFunction(dispatchesCallBack)
  }

  const [{ states }, dispatch] = useContext(ContextStore)

  if (isNotInvoked.current) {
    _dispatchesCallBack.current = dispatchesCallBack.map(
      (dispatchCallBack) =>
        (...props) =>
          dispatchCallBack(dispatch, ...props)
    )

    isNotInvoked.current = false
  }

  const context = useMemo(
    () => [
      returnStateByUseSelectorArg(states, selectorCallback),
      _dispatchesCallBack.current
    ],
    [states]
  )

  return context
}
