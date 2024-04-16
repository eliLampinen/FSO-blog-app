import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, 
  reducers: {
    setCurrentUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const { setCurrentUser, logoutUser } = userSlice.actions;

export const setUser = (user) => (dispatch) => {
  dispatch(setCurrentUser(user));
};

export const logout = () => (dispatch) => {
  dispatch(logoutUser());
};

export default userSlice.reducer;
