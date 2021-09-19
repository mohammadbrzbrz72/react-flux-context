import { useContext, useRef, useState, useEffect } from 'react'

import { returnStateByUseSelectorArg } from '../utils'
import { isItDefenitlyAFunctionOrNulish } from '../helper'
import { ContextStore } from '../store'

export function useSelector(callback) {
  // const [state, setState] = useState()
  const isNotInvoked = useRef(true)
  const newDdata = useRef()

  if (isNotInvoked.current) {
    isItDefenitlyAFunctionOrNulish(callback)

    // isNotInvoked.current = false
  }

  const [states] = useContext(ContextStore)
  if (isNotInvoked.current) {
    console.log('states 1:', states)
    // setState(states)
    newDdata.current = states
    isNotInvoked.current = false
  }

  console.log('states 2:', newDdata.current)
  const newState = returnStateByUseSelectorArg(states, callback)

  // useEffect(() => {
  //   console.log('newState:', newState)
  //   setState(newState)
  // }, [newState])

  return newDdata.current
}
