import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'

const NavigationMenu = ({ user }) => {
  const padding = {
    padding: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {<LoginButton user={user}/>}
    </div>
  )
}

export default NavigationMenu
