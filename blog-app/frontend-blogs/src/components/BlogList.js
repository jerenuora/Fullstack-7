import React from 'react'
import {  Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  const blogList = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {blogList.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          {' '}
          {
            <div id="blog-id" style={blogStyle} className="blog">
              {blog.title} {blog.author}
            </div>
          }
        </Link>
      ))}
    </div>
  )
}

export default BlogList
