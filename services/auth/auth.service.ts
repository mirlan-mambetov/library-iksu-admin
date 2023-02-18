import { UserData } from "@/../api/auth/auth.api"
import { IUser } from "@/../interfaces/user.interface"
import { baseService } from "../base.service"

export const authService = {
  async login(email: string, password: string) {
    const response = await baseService.post<UserData>('/auth/login', {
      email,
      password
    })
    return response.data
  }
}