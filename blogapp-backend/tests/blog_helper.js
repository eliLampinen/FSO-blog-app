const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'eka testi blogi',
    author: "pekka puuro",
    url: "www.testblogurl.fi",
    likes: 55
  },
  {
    title: 'hehe asd blogi',
    author: "asdasdasd",
    url: "www.ddddddd.fi",
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}