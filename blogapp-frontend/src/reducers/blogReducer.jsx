/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        createNewBlog (state, action) {
            return action.payload
        },
        removeBlog (state, action) {
            return ""
        },
        setAllBlogs (state, action) {
            return action.payload
        },
        resetAllBlogs (state, action) {
            return []
        }
    }

})

export const setBlog = (blog) => {
    return async dispatch => {
        dispatch(newBlog(blog))
    }
}

export const { createNewBlog, removeBlog, setAllBlogs, resetAllBlogs } = blogSlice.actions

export const refreshBlogs = () => {
    return async dispatch => {
      const allBlogs = await blogService.getAll()
      dispatch(setAllBlogs(allBlogs))
    }
  }


export default blogSlice.reducer