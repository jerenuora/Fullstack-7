import React from 'react'
import { Link } from 'react-router-dom'
import { ListItemButton, List } from '@mui/material'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 0,
    marginBottom: 5,
  }

  const blogList = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <List>
        {blogList.map((blog) => (
          <ListItemButton key={blog.id}>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              {
                <div id="blog-id" style={blogStyle} className="blog">
                  {blog.title} {blog.author}
                </div>
              }
            </Link>
          </ListItemButton>
        ))}
      </List>
    </div>
  )
}

export default BlogList
