import { useContext, useRef } from "react";

import { returnStateByUseSelectorArg } from "../utils";
import { isItDefenitlyAFunctionOrNulish } from "../helper";
import { ContextStore } from "../store";

export function useSelector(callback) {
  const isNotInvoked = useRef(true);

  if (isNotInvoked.current) {
    isItDefenitlyAFunctionOrNulish(callback);

    isNotInvoked.current = false;
  }

  const [{ states }] = useContext(ContextStore);

  return returnStateByUseSelectorArg(states, callback);
}
