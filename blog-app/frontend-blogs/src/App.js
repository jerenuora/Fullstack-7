import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setErrorMessage(`${user.name} logged in `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  const updateLikes = async (id, blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)))
  }

  const deleteBlog = async (id, userDeleting) => {
    console.log(userDeleting)
    console.log(user)
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exeption) {
      setErrorMessage('not authorised to delete')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-butt" type="submit">
        login
      </button>
    </form>
  )

  const blogList = () => {
    const blogList = blogs.sort((a, b) => b.likes - a.likes)
    console.log(blogList)
    return (
      <div>
        {blogList.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateLikes}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    )
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable id="create-toggle" buttonLabel="Create Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} setErrorMessage={setErrorMessage} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {user !== null ? (
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
          {loginForm()}
        </div>
      )}
    </div>
  )
}

export default App
