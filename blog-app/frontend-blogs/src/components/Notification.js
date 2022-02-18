import React from 'react'
import { Alert } from '@material-ui/lab'


const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div>{message && <Alert severity="success">{message}</Alert>}</div>
}

export default Notification