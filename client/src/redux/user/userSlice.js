import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.error = null
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updatedUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updatedUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deletedUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deletedUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const {
  signInFailure,
  signInSuccess,
  signInStart,
  updateUserStart,
  updatedUserSuccess,
  updatedUserFailure,
  deleteUserStart,
  deletedUserSuccess,
  deletedUserFailure
} = userSlice.actions

export default userSlice.reducer