import { FIRST_OPEN, LOGOUT } from '../type'

export const firstStart = () =>async dispatch => {
    dispatch({
      type: FIRST_OPEN
    })
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}

