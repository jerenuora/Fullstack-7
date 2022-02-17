import React from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id, blog))
  }
  const deleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
    navigate('/')
  }

  if (!blog){
    return null
  }
  return (
    <div id="blog-id" className="blog">
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button id="like-butt" onClick={updateLike}>
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        <button id="remove-butt" onClick={deleteBlog}>
          remove
        </button>
      </div>
    </div>
  )
}
export default Blog
