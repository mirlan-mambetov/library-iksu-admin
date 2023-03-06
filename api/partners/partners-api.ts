import { IPartners } from '@/interfaces/Partners-interface'
import { appApi } from '../api'

export const partnersApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchAllPartners: build.query<IPartners[], null>({
			query: () => ({
				url: 'partners',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'PARTNERS' }]
		}),
		createPartner: build.mutation<null, FormData>({
			query: data => ({
				url: 'partners',
				method: 'Post',
				body: data
			}),
			invalidatesTags: () => [{ type: 'PARTNERS' }]
		}),
		updatePartners: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `partners/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'PARTNERS' }]
		}),
		deletePartner: build.mutation<null, number>({
			query: id => ({ url: `partners/${id}`, method: 'Delete' }),
			invalidatesTags: () => [{ type: 'PARTNERS' }]
		})
	})
})
