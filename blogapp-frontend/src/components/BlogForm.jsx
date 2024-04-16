import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const BlogForm = ( { createBlog } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogAtBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <Form onSubmit={addBlogAtBlog}>
        <Form.Group>
          <Form.Label htmlFor="blogTitle">Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="blogTitle"
            placeholder="give title.."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="blogAuthor">Author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="blogAuthor"
            placeholder="give author.."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="blogUrl">Url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="blogUrl"
            placeholder="give url.."
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          id="blogSubmit"
          style={{ backgroundColor: 'blue', fontSize: '16px', margin: '10px 0' }}
        >
          create blog
      </Button>
      </Form>
    </div>
  );
}

export default BlogForm