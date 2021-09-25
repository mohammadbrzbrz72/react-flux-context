import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../types/authTypes'

const authState = {
  role: '',
  token: null,
  isLogin: false,
  loading: false
}

const authReducer = (state, { type, payload }) => {
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

export const auth = {
  // when you set a local keyword in storage, this state saved or deleted automaticly in localStorage,
  // you can use session keyword, it use sessionStorage
  // * it works like a redux-persist but very easier usage

  state: authState,
  reducer: authReducer,
  storage: 'local', // local | session
  storageKey: '_myAuth_'
}
