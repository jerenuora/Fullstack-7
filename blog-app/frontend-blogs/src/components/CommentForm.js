import React from 'react'

import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const addComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, { comment: event.target.comment.value }))
    event.target.comment.value = ''
  }
  return (
    <form onSubmit={addComment}>
      <TextField
        variant="outlined"
        label="Comment"
        id="comment"
        type="text"
        name="comment"
      ></TextField>{' '}
      <Button variant="contained" type="submit">
        comment
      </Button>
    </form>
  )
}
export default CommentForm
