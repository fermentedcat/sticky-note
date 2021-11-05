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

  const errorMessage = getErrorMessage(error.response.data) || message

  dispatch(
    uiActions.setNotification({
      type: 'error',
      message: errorMessage,
    })
  )
}

const getErrorMessage = (data) => {
  let message = false
  if (data.errorMessage) {
    message = data.errorMessage
  } else if (data.errors) {
    if (data.name === 'ValidationError') {
      let messages = ''
      const errorsArr = Object.values(data.errors)
      messages += 'Please fill in your'
      errorsArr.forEach((err) => {
        messages += ` ${err.path}`
      })
      message = `${messages} correctly.`
    }
  }
  return message
}
