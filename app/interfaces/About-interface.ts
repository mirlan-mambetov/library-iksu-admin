import { IBase } from './Base-interface'

export interface IAboutInfo extends IBase {
	title: string
	description: string
	image: string
}
export interface IAboutOwner extends IBase {
	name: string
	image: string
	phone: string
	email: string
}
export interface IAboutTablo extends IBase {
	ceils: number
	description: string
}
