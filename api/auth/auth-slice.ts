import { IUser } from '@/../interfaces/user.interface'
import {createSlice} from '@reduxjs/toolkit'
import { login } from './auth.api'

const userState: IUser = {
  name: '',
  email:'',
  avatar: '',
  createdAt: '',
  hashed_rt: '',
  id: null,
  password: '',
  updatedAt: ''
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLogged: false,
    accessToken: '',
    refreshToken: '',
    errors: null,
    user: userState
  },
  reducers: {},
  extraReducers: build => {
    build
    .addCase(login.pending, (state, {payload}) => {
      state.isLoading = true
      state.isLogged = false
      state.errors = null
    })
    .addCase(login.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.user = payload.user
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
      state.isLogged = true
      state.errors = null
    })
    .addCase(login.rejected, (state, {payload}) => {
      state.isLogged = false
      state.isLoading = false
      // @ts-ignore
      state.errors = payload
      state.user = null
      state.accessToken = ''
      state.refreshToken = ''
    })
  }
})