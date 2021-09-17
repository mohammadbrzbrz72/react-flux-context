import { useRef, useCallback } from 'react'

export function useRefStore({ initialState, isFunction = false }) {
  const refStore = useRef(initialState)

  const setRefStore = useCallback((data, isDataAFunction = isFunction) => {
    if (data instanceof Function && !isDataAFunction) {
      refStore.current = data(refStore.current)
    } else {
      refStore.current = data
    }
  }, [])

  return [refStore, setRefStore]
}
