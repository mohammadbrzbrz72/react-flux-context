import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../types/authTypes'

export const authState = {
  role: '',
  token: null,
  isLogin: false,
  loading: false
}

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case REGISTER_SUCCESS:
      return {
        ...payload,
        isLogin: true,
        loading: false
      }

    case REGISTER_FAILURE:
      return {
        ...payload,
        loading: false
      }

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOGOUT_SUCCESS:
      return {
        token: null,
        isLogin: false,
        loading: true
      }

    default:
      throw new Error('there is no type for authReducers')
  }
}
