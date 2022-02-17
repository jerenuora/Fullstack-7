import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  if (users) {
    const id = useParams().id
    const user = users.find((user) => user.id === id)
    return (
      <div>
        <h2>{user.name}</h2>
        <b>Blogs</b>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <div>Loding user...</div>
  }
}

export default User
