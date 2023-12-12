import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       user: null,
       error: '',
       message: '',
      isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload;
        state.error = '';
        state.message = '';
      },
    loginFailed: (state, action) => {
        state.error = action.payload;
        state.user = null;
      },
      signupFailed: (state, action) => {
        state.error = action.payload;
        state.user = null;
      },
      storeUserData: (state, action) => {
        state.user = action.payload;
      },
      isItLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
    logoutFxn: state => {

    },
  },
});

const { actions, reducer } = loginSlice;

export const {
 loginSuccess,
 loginFailed,
 signupFailed,
 storeUserData,
 clearUser,
 logoutFxn,
 isItLoading,
} = actions;

export default reducer;


