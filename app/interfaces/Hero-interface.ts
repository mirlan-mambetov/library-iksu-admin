import { IBase } from "./Base-interface"
import { IPage } from "./Page-interface"

export interface IHero extends IBase {
	title: string
	background?: string
	subcontent?: IHeroSubcontent[]
	page?: IPage
}

export interface IHeroSubcontent extends IBase {
	title: string
	description: string
	hero?: Pick<IHero, 'background' | 'createdAt' | 'id'>
}