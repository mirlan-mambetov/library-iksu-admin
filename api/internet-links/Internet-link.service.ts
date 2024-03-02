import {
	IInternetLink,
	IInternetLinkCategory
} from '@/interfaces/Internet-links.interface'
import { appApi } from '../api'

export const internetLinkApi = appApi.injectEndpoints({
	endpoints: builder => ({
		fetchMainLinkCategories: builder.query<IInternetLink[], null>({
			query: () => ({
				url: '/internet'
			}),
			providesTags: ['INTERNET']
		}),
		fetchCategoriesByMainCategory: builder.query<
			IInternetLinkCategory[],
			number
		>({
			query: id => ({
				url: `/internet/link/${id}`
			}),
			providesTags: ['INTERNET']
		}),
		createLinkMainCategory: builder.mutation<
			null,
			{ data: Pick<IInternetLink, 'name'> }
		>({
			query: ({ data }) => ({
				url: `/internet`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		}),
		updateLinkMainCategory: builder.mutation<
			null,
			{ data: Pick<IInternetLink, 'name'>; id: number }
		>({
			query: ({ id, data }) => ({
				url: `/internet/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		}),
		createLinkCategory: builder.mutation<
			null,
			{
				data: Pick<IInternetLinkCategory, 'name' | 'description' | 'link'>
				id: number
			}
		>({
			query: ({ id, data }) => ({
				url: `/internet/link/${id}`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		}),
		updateLinkCategory: builder.mutation<
			null,
			{
				data: Pick<IInternetLinkCategory, 'name' | 'description' | 'link'>
				id: number
			}
		>({
			query: ({ id, data }) => ({
				url: `/internet/link/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		}),
		deleteLinkMainCategory: builder.mutation<null, number>({
			query: id => ({
				url: `/internet/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		}),
		deleteLinkCategory: builder.mutation<null, number>({
			query: id => ({
				url: `/internet/link/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: (res, err) => [{ type: 'INTERNET' }]
		})
	})
})
