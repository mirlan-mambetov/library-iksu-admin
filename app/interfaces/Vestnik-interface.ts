import { IBase } from './Base-interface'

export interface IVestnikArhiv extends IBase {
	name: string
	materials: Pick<IVestnikMaterial, 'id'>[]
}
export interface IVestnikMaterial extends IBase {
	authors: string
	name: string
	description: string
	file: string
	downloaded: number
	views: number
	category: IVestnikArhiv
}
export interface IVestnikPagination {
	items: IVestnikMaterial[]
	meta?: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
}
