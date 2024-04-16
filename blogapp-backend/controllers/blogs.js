const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.get('', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

  })
  
blogsRouter.post('', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes
    })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', 'username name');

    response.status(201).json(populatedBlog)

  })

blogsRouter.put('/:id', async (req, res) => {

    const { id } = req.params;
    const update = {
      ...req.body,
      user: req.body.user.id
    };

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        update,
        { new: true, runValidators: true, context: 'query' }
      ).populate('user', { username: 1, name: 1 });
      if (updatedBlog) {
        logger.info(`Successfully added like to blog id: ${id}`)
        res.json(updatedBlog.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'invalid id or data' });
    }

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.delete('', async (request, response) => {
  await Blog.deleteMany({});
  response.status(204).end()
})

  
module.exports = blogsRouter