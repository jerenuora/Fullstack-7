import React from 'react'

import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const addComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, { comment: event.target.comment.value }))
    event.target.comment.value = ''
  }
  return (
    <form onSubmit={addComment}>
      <input id="comment" type="text" name="comment"></input>
      <button type="submit">comment</button>
    </form>
  )
}
export default CommentForm
