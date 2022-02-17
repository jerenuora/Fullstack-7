import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { notificationSetter } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
const LogoutButton = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      {user.name} logged in{' '}
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedBlogsAppUser')
          dispatch(setUser(null))
          dispatch(notificationSetter(null))
          navigate('/')
        }}
      >
        logout
      </button>
    </>
  )
}
export default LogoutButton
