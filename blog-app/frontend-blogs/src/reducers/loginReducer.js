import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationSetter } from './notificationReducer'

const loginReducer = (state=null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return state
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const doLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(notificationSetter(`${user.name} logged in`, 5))
      dispatch(setUser(user))
      dispatch({
        type: 'LOGIN',
        data:user
      })
    } catch (exception) {
      dispatch(notificationSetter('wrong username or password', 10))
    }
  }
}

export const setUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } else {
      dispatch({
        type: 'SET_USER',
        data: null
      })}
  }
}


export default loginReducer