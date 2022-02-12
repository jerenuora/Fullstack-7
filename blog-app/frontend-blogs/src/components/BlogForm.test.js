import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('Blogform calls with correct info', () => {
  const blog = {
    title: 'A kind of title',
    author: 'A. Author',
    url: 'www.url.com'
  }

  const CreateBlog = jest.fn()
  const mockSetErrorMessage = jest.fn()

  const component = render(
    <BlogForm createBlog={CreateBlog} setErrorMessage={mockSetErrorMessage} />
  )

  const newTitle = component.container.querySelector('#title_id')
  const newAuthor = component.container.querySelector('#author_id')
  const newUrl = component.container.querySelector('#url_id')
  const form = component.container.querySelector('#form_id')

  fireEvent.change(newTitle, {
    target: { value: blog.title }
  })
  fireEvent.change(newAuthor, {
    target: { value: blog.author }
  })
  fireEvent.change(newUrl, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)
  expect(CreateBlog.mock.calls).toHaveLength(1)
  expect(CreateBlog.mock.calls[0][0].title).toBe('A kind of title')
  expect(CreateBlog.mock.calls[0][0].author).toBe('A. Author')
  expect(CreateBlog.mock.calls[0][0].url).toBe('www.url.com')
})

