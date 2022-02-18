import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import NavigationMenu from './components/Navigation'
import Container from '@material-ui/core/Container'
import Notification from './components/Notification'

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

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable id="create-toggle" buttonLabel="Create Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const blogPage = () => {
    return (
      <div>
        <h2>Blogs</h2>

        {blogForm()}
        {<BlogList blogs={blogs} />}
      </div>
    )
  }
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <Container>
      <NavigationMenu user={user} />
      <Notification message={message} />

      {user !== null && user ? (
        <div>
          <div>
            <Routes>
              <Route path="/blogs/:id" element={<Blog blog={blog} />} />
              <Route path="/users/:id" element={<User users={users} />} />
              <Route path="/users" element={<UserList users={users} />} />
              <Route path="/" element={blogPage()} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </Container>
  )
}

export default App
