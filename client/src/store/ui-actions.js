import { uiActions } from './ui-slice'
import { userActions } from './user-slice'

export const handleSuccessMsg = (dispatch, message) => {
  dispatch(
    uiActions.setNotification({
      type: 'success',
      message: message,
    })
  )
}

export const handleErrorMsg = (error, dispatch, message) => {
  if (error.response.status === 401) {
    dispatch(userActions.logout())
    dispatch(
      uiActions.setNotification({
        type: 'error',
        message: 'Your session has timed out. Please login again.',
      })
    )
    return
  }
  dispatch(
    uiActions.setNotification({
      type: 'error',
      message: message,
    })
  )
}
