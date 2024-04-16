import { useState, useEffect, useRef } from 'react'
import './App.css';

import Blog from './components/Blog'
import {SingleBlog} from './components/Blog'
import Menu from './components/Menu'
import {SingleUser, Users} from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import {ErrorForm} from './components/ErrorForm'

import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { refreshBlogs, createNewBlog, resetAllBlogs } from './reducers/blogReducer'
import { setCurrentUser, logoutUser, } from './reducers/userReducer'
import { Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  Routes,
  Route
} from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [allUsers, setallUsers] = useState([])

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user);


  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await userService.getAll();
      console.log(`Setting all users: ${allUsers}`)
      setallUsers(allUsers)
    };
  
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
    dispatch(refreshBlogs())
    }
  }, [user, dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setCurrentUser(user));
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(setNotification(`wrong credentials!`, 5))

    }
  }

  const handleLogout = async (event) => {
    console.log('logging out', user.name)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser());
    dispatch(resetAllBlogs());
  }


  const blogFormRef = useRef()
  const addBlog = async (blog) => {

    const newBlog = {
      author: blog.author,
      url: blog.url,
      title: blog.title,
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      console.log('Blog created successfully', createdBlog)
      createNewBlog(blogs.concat(createdBlog))
      dispatch(setNotification(`a new blog added: ${blog.title} by ${blog.author}`, 5))
      dispatch(refreshBlogs())
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.error('Error creating blog', error)
    }
  }

  const removeBlogFromState = () => {
    dispatch(refreshBlogs())
  }


  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label htmlFor="loginUsername">username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="loginUsername"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="loginPassword">password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="loginPassword"
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  );

  const blogForm = () => (
    <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loggedInForm = () => (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <h4 style={{ margin: '0', marginRight: '10px' }}>{`User ${user.name} logged in`}</h4>
      <form onSubmit={handleLogout}>
        <Button variant="outline-danger" type="submit">logout</Button>
      </form>
    </div>
  );

  const renderForms = () => {
    if (!user) {
      return loginForm();
    } else {
      return (
        <>
          {loggedInForm()}
          {blogForm()}
        </>
      );
    }
  };
  return (
    <div className="container" >
      <h1 className="shady-title">Blog application</h1>
      <Menu />
      <ErrorForm />
      {renderForms()}

      <Table striped>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} removeBlogFromState={removeBlogFromState}/>
        )}
      </Table>

      <Routes>
        <Route path="/" element={null} />
        <Route path="/users" element={<Users allUsers={allUsers} />} />
        <Route path="/users/:id" element={<SingleUser allUsers={allUsers} />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>

    </div>
  )
}

export default App