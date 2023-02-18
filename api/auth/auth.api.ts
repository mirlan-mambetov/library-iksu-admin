import { IUser } from '@/../interfaces/user.interface'
import { authService } from '@/../services/auth/auth.service'
import {createAsyncThunk} from '@reduxjs/toolkit'

export interface UserData {
  user: IUser 
  accessToken: string
  refreshToken: string
}

export const login = createAsyncThunk<UserData | null, {email: string, password: string}>('auth/login', 
  async ({email, password}, {rejectWithValue}) => {
    try{
      const response = await authService.login(email, password)
      return response
    } catch(e) {
      if (e.response && e.response.data.message) {
        return rejectWithValue(e.response.data.message)
      } else {
        return rejectWithValue(e.message)
      }
    }
  }
)