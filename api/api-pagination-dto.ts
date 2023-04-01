export interface IApiPaginationDto {
	page?: number
	limit?: number
}
export interface IApiMetaDto<T> {
	items?: T[]
	meta?: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
}
