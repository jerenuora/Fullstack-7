import blogService from '../services/blogs'

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
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}
export default blogReducer
