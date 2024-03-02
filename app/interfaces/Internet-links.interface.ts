import { IBase } from './Base-interface'

export interface IInternetLink extends IBase {
	name: string
	categories: IInternetLinkCategory[]
}
export interface IInternetLinkCategory extends IBase {
	name: string
	description: string
	link: string
}
