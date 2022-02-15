import blogService from '../services/blogs'
import { notificationSetter } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const blogsLeft = state.filter(a => a.id !== action.data)
    return [...blogsLeft]
  case 'LIKE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const blogs = state.filter(blog => blog.id !== action.data.id)
    return [...blogs, action.data.blogObject]
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
export default blogReducer
