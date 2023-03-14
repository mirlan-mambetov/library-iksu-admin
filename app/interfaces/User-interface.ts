import { IBase } from './Base-interface'

export interface IUser extends IBase {
	email: string
	name: string
	avatar: null
	hashed_rt: null
	role: []
}
export interface IUserDto {
	name: string
	email: string
	password: string
}
