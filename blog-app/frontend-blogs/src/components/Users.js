import React from 'react'
import { Link } from 'react-router-dom'
import { TableCell } from '@material-ui/core'

const Users = ({ user }) => {
  return (
    <>
      <TableCell>
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </>
  )
}

export default Users
