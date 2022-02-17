import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ user }) => {
  return (
    <tr>
      <td>
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name} </Link>
        </li>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default Users
