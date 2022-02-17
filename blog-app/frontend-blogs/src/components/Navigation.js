import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LogoutButton'

const NavigationMenu = ({ user }) => {
  const padding = {
    padding: 5,
  }
  if (user) {
    return (
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {<LoginButton user={user} />}
      </div>
    )
  }
  return null
}

export default NavigationMenu
