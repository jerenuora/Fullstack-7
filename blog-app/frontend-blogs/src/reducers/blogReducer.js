/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { notificationSetter } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG':
    const blogsLeft = state.filter(a => a.id !== action.data)
    return [...blogsLeft]
  case 'LIKE_BLOG':
    const blogs = state.filter(blog => blog.id !== action.data.id)
    return [...blogs, action.data.blogObject]
  case 'COMMENT_BLOG':
    const blogs2 = state.filter(blog => blog.id !== action.data.id)
    return [...blogs2, action.data.blogObject]
  default:
    return state
  }
}

export const newBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })} catch (exeption) {
      dispatch(notificationSetter('Not authorized to delete',10))
    }
  }
}

export const likeBlog = (id, blog) => {
  const blogObject = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    await blogService.update(id, blogObject)
    dispatch({
      type:'LIKE_BLOG',
      data: { id, blogObject }
    })}
}

export const commentBlog = (blog, comment) => {
  const id = blog.id
  return async (dispatch) => {
    const response = await blogService.comment(blog.id, comment)
    const blogObject = { ...blog, comments: blog.comments.concat(response) }
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id , blogObject }
    })
  }
}
export default blogReducer
