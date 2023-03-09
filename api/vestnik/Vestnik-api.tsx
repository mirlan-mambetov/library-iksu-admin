import { IVestnikArhiv } from '@/interfaces/Vestnik-interface'
import { appApi } from '../api'

export const vestnikApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchVestnik: build.query<IVestnikArhiv[], null>({
			query: () => ({
				url: 'vestnik',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'VESTNIK' }]
		}),
		createArchiv: build.mutation<null, { pageId: number; data: string }>({
			query: ({ pageId, data }) => ({
				url: `vestnik/${pageId}`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		}),
		updateArchiv: build.mutation<null, { id: number; data: string }>({
			query: ({ id, data }) => ({
				url: `vestnik/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		}),
		deleteArchiv: build.mutation<null, number>({
			query: id => ({
				url: `vestnik/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		})
	})
})
