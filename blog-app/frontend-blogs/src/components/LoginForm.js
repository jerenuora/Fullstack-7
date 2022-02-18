import React from 'react'
import { useDispatch } from 'react-redux'
import { doLogin } from '../reducers/loginReducer'
import {  Button, TextField } from '@material-ui/core'

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
          <TextField label='username' id="username" type="text" name="username" />
        </div>
        <div>
          <TextField label='password' id="password" type="password" name="password" />
        </div>
        <Button id="login-butt" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
