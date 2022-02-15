import React from 'react'
import { useDispatch } from 'react-redux'
import { doLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(doLogin(event.target.password.value, event.target.username.value))
  }

  return (
    <div>
      <h2>Login to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="password" />
        </div>
        <button id="login-butt" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
