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
		}),
		createMainCategory: build.mutation<null, FormData>({
			query: body => ({
				url: 'elibrary',
				method: 'Post',
				body
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		}),
		updateMainCategory: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `elibrary/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		}),
		deleteMainCategory: build.mutation<null, number>({
			query: id => ({
				url: `elibrary/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		}),
		createSecondCategory: build.mutation<null, { id: number; data: string }>({
			query: ({ id, data }) => ({
				url: `elibrary/category/${id}`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		}),
		updateSecondCategory: build.mutation<null, { id: number; data: string }>({
			query: ({ id, data }) => ({
				url: `elibrary/category/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		}),
		deleteSecondCategory: build.mutation<null, number>({
			query: id => ({
				url: `elibrary/category/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'ELIBRARY' }]
		})
	})
})
