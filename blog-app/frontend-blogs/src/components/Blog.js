import React from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'
import {  Button } from '@material-ui/core'

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
  if (!blog) {
    return <div>Loading blog...</div>
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
          <Button variant='contained' id="like-butt" onClick={updateLike}>
            like
          </Button>
        </div>
        <div>{blog.user.username}</div>
        <Button variant='contained' id="remove-butt" onClick={deleteBlog}>
          remove
        </Button>
      </div>
      <h2>Comments</h2>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}
export default Blog
