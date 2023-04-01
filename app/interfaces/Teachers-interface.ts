import { IBase } from './Base-interface'

export interface ITeachers extends IBase {
	name: string
	description: string
	works: ITeachersWorks[]
}
export interface ITeachersWorks extends IBase {
	authors: string
	name: string
	description: string
	file: string
	downloaded: number
	views: number
	category: ITeachersCategory
}
export interface ITeachersCategory extends IBase {
	name: string
	description: string
}
