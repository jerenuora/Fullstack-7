import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('Blog renders title, author, not url, likes', () => {
  const blog = {
    title: 'A title',
    author: 'An author',
    url: 'www.url.com',
    likes: 12,
    user: 'user'
  }

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'A title'
  )
  expect(component.container).toHaveTextContent(
    'An author'
  )
  expect(component.container).not.toHaveTextContent(
    'www.url.com'
  )
  expect(component.container).not.toHaveTextContent(
    12
  )
})
test('Blog renders title, author and url, likes after view-button click ', () => {
  const blog = {
    title: 'A title',
    author: 'An author',
    url: 'www.url.com',
    likes: 12,
    user: 'user'
  }

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'A title'
  )
  expect(component.container).toHaveTextContent(
    'An author'
  )
  expect(component.container).toHaveTextContent(
    'www.url.com'
  )
  expect(component.container).toHaveTextContent(
    12
  )
})

test('Like button handles is called correct times ', () => {
  const blog = {
    title: 'A title',
    author: 'An author',
    url: 'www.url.com',
    likes: 12,
    user: 'user'
  }
  const mockUpdate = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockUpdate}/>
  )
  const view_button = component.getByText('view')
  fireEvent.click(view_button)
  const like_button = component.getByText('like')
  fireEvent.click(like_button)
  fireEvent.click(like_button)
  expect(mockUpdate.mock.calls).toHaveLength(2)
})
