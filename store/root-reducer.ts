import {combineReducers} from 'redux'
import { appApi } from '../api/api'
import { authSlice } from '../api/auth/auth-slice'
export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  auth: authSlice.reducer
})