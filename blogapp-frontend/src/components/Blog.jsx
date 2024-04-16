import { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import '../App.css';

import {
  Link,
  useParams 
} from "react-router-dom"

export const SingleBlog = () => {
  const blogs = useSelector(state => state.blogs)
  const { id } = useParams();
  const blogToView = blogs.find(blog => blog.id === id); 

  if (!blogToView) return <p>Blog not found.</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>{blogToView.title}</h2> 
      <p style={{ margin: '5px 0' }}>
        <a href={blogToView.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
          {blogToView.url}
        </a>
      </p>
      <p style={{ margin: '5px 0' }}>{blogToView.likes || 0} likes</p>
      <p style={{ margin: '5px 0' }}>Blog added to the service by user {blogToView.user.username}</p>
    </div>
  )
}


const Blog = ({ blog: initialBlog, removeBlogFromState }) => {
  const [blog, setBlog] = useState(initialBlog);
  const [visible, setVisible] = useState(false);
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  const user = JSON.parse(loggedUserJSON);
  const curUser = user.username;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async () => {
    try {
      const updatedBlog = await blogService.addLike(blog); 
      setBlog(updatedBlog); 
    } catch (error) { 
      console.log(`Error while trying to add like to blog: ${error}`);
    }
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog);
        removeBlogFromState();
      } catch (error) {
        console.log(`Error while trying to remove blog: ${error}`);
      }
    }
  };

  return (
    <div className="blog-style">
      <div>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link> 
      {' '} by {' '}
      {blog.author}
      <button onClick={toggleVisibility} className="base-button view-button">{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="content-container">
        {visible && (
          <div>
            <div className="url-display">
              url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
            </div>
            <div>
              likes: {blog.likes || '0'}
              <button onClick={addLike} className="base-button like-button">like</button>
            </div>
            {blog.user.username === curUser && (
              <button onClick={removeBlog} className="base-button remove-button">remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  removeBlogFromState: PropTypes.func.isRequired,
};

export default Blog;
