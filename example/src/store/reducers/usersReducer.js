import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE
} from '../types/userTypes'

const userState = {
  loading: false,
  users: []
}

const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      }

    case USER_INFO_SUCCESS:
      return {
        users: payload,
        loading: false
      }

    case USER_INFO_FAILURE:
      return {
        users: [],
        loading: false
      }

    default:
      throw new Error('there is no type for authReducers')
  }
}

export const user = {
  state: userState,
  reducer: usersReducer
}
