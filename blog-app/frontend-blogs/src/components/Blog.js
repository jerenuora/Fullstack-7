import React from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log('BLOG',blog)
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
    return (
      <div>
        Loading blog...
      </div>
    )
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
      <h2>Comments</h2>
      {blog.comments.map((comment) => (<li key={comment.id}>{comment.comment}</li>))}
    </div>
  )
}
export default Blog
