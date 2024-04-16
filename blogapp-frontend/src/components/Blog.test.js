import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
jest.mock('../services/blogs')

const localStorageMock = (function() {
  let store = {}
  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

beforeEach(() => {
  blogService.addLike.mockImplementation(() => Promise.resolve())
  const user = { username: 'testUser' }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
})

test('render only author and title by default', () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5
  }
  const mockRemoveBlogFromState = jest.fn()

  render(<Blog blog={blog} removeBlogFromState={mockRemoveBlogFromState} />)

  const titleAuthorElement = screen.getByText('test title test author', { exact: false })
  expect(titleAuthorElement).toBeDefined()

  const urlElement = screen.queryByText('test url')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('5')
  expect(likesElement).toBeNull()
})

test('render likes and url when box clicked', async () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5,
    user: {
      name: 'testname'
    }
  }
  const mockRemoveBlogFromState = jest.fn()

  render(<Blog blog={blog} removeBlogFromState={mockRemoveBlogFromState} />)

  const titleAuthorElement = screen.getByText('test title test author', { exact: false })
  expect(titleAuthorElement).toBeDefined()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.queryByText('test url')
  expect(urlElement).toBeDefined()

  const likesElement = screen.queryByText('5')
  expect(likesElement).toBeDefined()

  const userElement = screen.queryByText('testname')
  expect(userElement).toBeDefined()
})

test('like button clicked right amount of times and with correct data', async () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5,
    user: {
      name: 'testname'
    }
  }
  const mockRemoveBlogFromState = jest.fn()
  const mockHandler = jest.fn()

  render(<Blog blog={blog} removeBlogFromState={mockRemoveBlogFromState} />)

  const titleAuthorElement = screen.getByText('test title test author', { exact: false })
  expect(titleAuthorElement).toBeDefined()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)

  expect(blogService.addLike).toHaveBeenCalledWith(blog)

  await user.click(likeButton)
  expect(blogService.addLike).toHaveBeenCalledTimes(2)

})

