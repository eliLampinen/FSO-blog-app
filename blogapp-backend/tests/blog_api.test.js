const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_helper')

const api = supertest(app)

beforeEach(async () => {
    const deleteResponse = await Blog.deleteMany({});
    const insertResponse = await Blog.insertMany(helper.initialBlogs);
})


test('correct amount of blogs returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  expect(response.body.length).toBe(2);

})

test('id field', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  expect(response.body[0]?.id).toBeDefined();
})

test('add one blog', async () => {
    const payload = {
        "title": "added one",
        "author": "Pekka",
        "url": "pekanblogi.com",
        "likes": 5,
    }
    await api
      .post('/api/blogs')
      .send(payload)
      .expect(201)

    const response = await api
      .get('/api/blogs')
      .expect(200)
  expect(response.body.length).toBe(3);
  expect(response.body[2]?.title).toBe("added one");
})

test('remove one blog', async () => {
    const payload = {
        "title": "to be deleted",
    }
    const res = await api
      .post('/api/blogs')
      .send(payload)
      .expect(201)
    
    await api
      .delete(`/api/blogs/${res.body.id}`)
      .expect(204)

})


afterAll(async () => {
  await mongoose.connection.close()
})