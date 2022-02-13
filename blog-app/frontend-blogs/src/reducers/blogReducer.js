import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
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
    console.log(blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}
export default blogReducer
