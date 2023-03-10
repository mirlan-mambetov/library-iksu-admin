import { IBase } from './Base-interface'

export interface IElibraryCategory extends IBase {
	name: string
	image: string
	secondCategory: Pick<IElibrarySecondCategory, 'id' | 'name' | 'books'>[]
}
export interface IElibrarySecondCategory extends IBase {
	name: string
	books: IElibraryBooks[]
}
export interface IElibraryBooks extends IBase {
	authors: string
	name: string
	description: string
	published: number
	downloaded: number
	views: number
	file: string
}
export interface IElibraryPagination {
	items: IElibraryBooks[]
	meta?: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
}
