import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route, //Link
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div className="error">{message}</div>
}

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
    dispatch(getUsers())
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
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable id="create-toggle" buttonLabel="Create Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const blogPage = () => {
    return (
      <div>
        {blogForm()}
        {blogList()}
      </div>
    )
  }

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
          <Router>
            <Routes>
              <Route path="/users/:id" element={<User users={users} />} />
              <Route path="/users" element={<UserList users={users} />} />
              <Route path="/" element={blogPage()} />
            </Routes>
          </Router>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
