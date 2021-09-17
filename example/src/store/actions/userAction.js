import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE
} from '../types/userTypes'
import { userApi } from '../../services'

const userRequsetAction = (dispatch) => {
  dispatch({ key: 'user', type: USER_INFO_REQUEST })
}

const userSuccessAction = (dispatch, payload) => {
  dispatch({ key: 'user', type: USER_INFO_SUCCESS, payload })
}

const userFailureAction = (dispatch) => {
  dispatch({ key: 'user', type: USER_INFO_FAILURE })
}

export const userAction = (dispatch) => {
  userRequsetAction(dispatch)

  userApi()
    .then((res) => {
      userSuccessAction(dispatch, res.data)
    })
    .catch((err) => {
      userFailureAction(dispatch)
    })
}
