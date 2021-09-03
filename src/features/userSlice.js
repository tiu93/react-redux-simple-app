import { createSlice } from '@reduxjs/toolkit';
import { setToLocalStorage } from 'helpers';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userCredentials: {
      userName: 'test',
      password: 'test1',
    },
    userInfo: {
      userName: '',
    },
    isAuth: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.userInfo = action.payload;
      state.isAuth = true;
      setToLocalStorage('token', 'MyToken');
    },
    logout: (state) => {
      state.userInfo = {};
      state.isAuth = false;
      setToLocalStorage('token', '');
    },
  },
});

export const { signIn, logout } = userSlice.actions;

export default userSlice.reducer;
