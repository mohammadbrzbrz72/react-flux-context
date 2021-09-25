import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../types/authTypes'
import { loginApi } from '../../services'

// set key to select collection reducer;
const key = 'auth'

// Login actions
const authRequsetAction = (dispatch) => {
  dispatch({ key, type: REGISTER_REQUEST })
}

const authSuccessAction = (dispatch, payload) => {
  dispatch({ key, type: REGISTER_SUCCESS, payload })
}

const authFailureAction = (dispatch) => {
  dispatch({ key, type: REGISTER_FAILURE })
}

export const authLoginAction = (dispatch) => {
  authRequsetAction(dispatch)

  loginApi()
    .then((res) => {
      authSuccessAction(dispatch, res)
    })
    .catch((err) => {
      authFailureAction(dispatch)
    })
}

// Logout actions
export const logoutRequestAction = (dispatch) => {
  dispatch({ key, type: LOGOUT_REQUEST })
}

export const logoutSuccessAction = (dispatch) => {
  dispatch({ key, type: LOGOUT_SUCCESS })
}

export const logoutAction = (dispatch) => {
  logoutRequestAction(dispatch)
  setTimeout(() => {
    logoutSuccessAction(dispatch)
  }, 1000)
}
