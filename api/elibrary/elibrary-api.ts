import {
	IElibraryBooks,
	IElibraryCategory,
	IElibraryPagination,
	IElibrarySecondCategory
} from '@/interfaces/Elibrary-interface'
import { appApi } from '../api'
import { IApiPaginationDto } from '../api-pagination-dto'

export const elibraryApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchAllMainCategories: build.query<IElibraryCategory[], null>({
			query: () => ({
				url: 'elibrary',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'ELIBRARY' }]
		}),
		fetchMainCategoriesById: build.query<IElibraryCategory, number>({
			query: id => ({
				url: `elibrary/${id}`,
				method: 'Get'
			}),
			providesTags: () => [{ type: 'ELIBRARY' }]
		}),
		fetchCategoryByMainCategory: build.query<IElibrarySecondCategory[], number>(
			{
				query: id => ({
					url: `elibrary/category/${id}`
				}),
				providesTags: () => [{ type: 'ELIBRARY' }]
			}
		),
		fetchSecondCategoryById: build.query<
			Pick<IElibrarySecondCategory, 'name' | 'id' | 'books'>,
			number
		>({
			query: id => ({
				url: `elibrary/category/category/${id}`
			}),
			providesTags: () => [{ type: 'ELIBRARY' }]
		}),
		fetchBooksByCategory: build.query<
			IElibraryPagination,
			{ id: number; query?: IApiPaginationDto }
		>({
			query: ({ id, query }) => ({
				url: `elibrary/books/category/${id}?page=${query?.page}&limit=${query?.limit}`
			}),
			providesTags: ['Pages']
		})
	})
})
