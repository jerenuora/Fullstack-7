const notificationReducer = (state='', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

var timeoutID
export const notificationSetter = (notification, time) => {
  console.log('notificationSetteriss äkäytty  ')
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: '',
        }),
      time * 1000
    )
  }
}

export default notificationReducer
