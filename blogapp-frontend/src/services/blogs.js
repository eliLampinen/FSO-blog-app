import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async currentBlog => {

  const newBlog = {
    ...currentBlog,
    likes: currentBlog.likes + 1
  }

  const response = await axios.put(`${baseUrl}/${currentBlog.id}`, newBlog)
  console.log(`Added like Data: ${response.data} Status: ${response.status}`);
  return response.data

}

const removeBlog = async blogToRemove => {
  const response = await axios.delete(`${baseUrl}/${blogToRemove.id}`)
  console.log(`Removed blog Data: ${response.data} Status: ${response.status}`);
  return response.data

}

export default { getAll, create, setToken, addLike, removeBlog }