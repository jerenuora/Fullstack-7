import React from 'react'

const LoginButton = ({ user }) => {
  if (user) {
    return (
      <>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogsAppUser')
          }}
        >
          logout
        </button>
      </>
    )
  }
  return null
}
export default LoginButton
