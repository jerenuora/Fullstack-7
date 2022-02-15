import React from 'react'

const Users = (user) => {
  return (
    <tr>
      <td>{user.user.name}</td><td>{user.user.blogs.length}</td>
    </tr>
  )
}

export default Users
