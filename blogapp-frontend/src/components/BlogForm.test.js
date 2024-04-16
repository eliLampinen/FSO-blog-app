import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('callback function called with correct blog details', async () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  }
  const mockBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockBlog} />)

  const inputTitle = screen.getByPlaceholderText('give title..')
  const inputAuthor= screen.getByPlaceholderText('give author..')
  const inputUrl = screen.getByPlaceholderText('give url..')
  const sendButton = screen.getByText('create blog')


  await user.type(inputTitle, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputUrl, blog.url)
  await user.click(sendButton)

  expect(mockBlog.mock.calls).toHaveLength(1)
  expect(mockBlog).toHaveBeenCalledWith(expect.objectContaining({
    title: blog.title,
    author: blog.author,
    url: blog.url,
  }))

})