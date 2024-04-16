/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        newNotification (state, action) {
            return action.payload
        },
        removeNotification (state, action) {
            return ""
        }
    }

})

export const setNotification = (notification, notificationTime) => {
    return async dispatch => {
        dispatch(newNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
          }, notificationTime*1000)
    }
}

export const { newNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer