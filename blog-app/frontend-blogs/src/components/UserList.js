import React from 'react'
import Users from './Users'

const UserList = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
            {users.map((user) => (
              <Users key={user.id} user={user} />
            ))}
          </thead>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Users</h2>
        Loading users....
      </div>
    )
  }
}

export default UserList
