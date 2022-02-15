import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { newBlog, initBlogs } from './reducers/blogReducer'
import { setUser, } from './reducers/loginReducer'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div className="error">{message}</div>
}

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blogObject))
  }

  const blogList = () => {
    const blogList = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogList.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    )
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable id="create-toggle" buttonLabel="Create Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}  />
    </Togglable>
  )
  console.log(user)
  return (
    <div>
      <Notification message={message} />

      {user !== null && user ? (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button
              onClick={() =>
                window.localStorage.removeItem('loggedBlogsAppUser')
              }
            >
              logout
            </button>
          </p>
          {blogForm()}
          {blogList()}
        </div>
      ) : (
        <div>
          <h2>Login to app</h2>
          <LoginForm />
        </div>
      )}
    </div>
  )
}

export default App
