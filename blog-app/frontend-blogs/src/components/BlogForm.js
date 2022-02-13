import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notificationSetter } from '../reducers/notificationReducer'
import store from '../store'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    dispatch(notificationSetter(`A new blog '${newTitle}'' by ${newAuthor} was added`,10))
    console.log(store.getState())
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form id="form_id" onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <p>
        title:
        <input
          id="title_id"
          type="text"
          value={newTitle}
          name="blog"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </p>
      <p>
        author:
        <input
          id="author_id"
          type="text"
          value={newAuthor}
          name="blog"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </p>
      <p>
        url:
        <input
          id="url_id"
          type="text"
          value={newUrl}
          name="blog"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </p>
      <button id="submit-butt" type="submit">
        create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
