import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)
  const dispatch = useDispatch()

  const updateLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id, blog))
  }
  const deleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }
  if (showFullInfo) {
    return (
      <div id="blog-id" style={blogStyle} className="blog">
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowFullInfo(false)}>hide</button>
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
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button id="view-butt" onClick={() => setShowFullInfo(true)}>
            view
          </button>
        </div>
      </div>
    )
  }
}
Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}
export default Blog
