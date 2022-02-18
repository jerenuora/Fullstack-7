import React from 'react'
import Users from './Users'
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'

const UserList = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label='users-table'>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Blogs created</TableCell>
              </TableRow>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <Users key={user.id} user={user} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
