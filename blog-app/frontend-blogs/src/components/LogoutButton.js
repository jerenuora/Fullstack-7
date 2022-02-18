import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { notificationSetter } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import {  Button } from '@material-ui/core'

const LogoutButton = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      {user.name} logged in{' '}
      <Button variant='outlined'
        onClick={() => {
          window.localStorage.removeItem('loggedBlogsAppUser')
          dispatch(setUser(null))
          dispatch(notificationSetter(null))
          navigate('/')
        }}
      >
        logout
      </Button>
    </>
  )
}
export default LogoutButton
