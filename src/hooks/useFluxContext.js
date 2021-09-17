import { useContext, useCallback, useRef } from 'react'

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

  const [{ states }, dispatch] = useContext(ContextStore)

  const _dispatchCallBack = useCallback(
    (...props) => dispatchCallBack(dispatch, ...props),
    []
  )

  return [
    returnStateByUseSelectorArg(states, selectorCallback),
    _dispatchCallBack
  ]
}
