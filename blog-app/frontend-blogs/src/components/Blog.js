import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const updateLike = async (event) => {
    event.preventDefault()
    updateBlog(blog.id, blog)
  }
  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id, blog.user)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }
  console.log(blog)
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
          <button id="remove-butt" onClick={removeBlog}>
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
