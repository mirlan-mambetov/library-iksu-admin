import axios from "axios" 

export const APP_HOST = process.env.NEXT_PUBLIC_API_HOST

export const baseService = axios.create({
  baseURL: APP_HOST,
  headers: {'Content-Type': 'application/json'}
})