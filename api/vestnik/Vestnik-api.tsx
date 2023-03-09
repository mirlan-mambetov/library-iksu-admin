import {
	IVestnikArhiv,
	IVestnikMaterial,
	IVestnikPagination
} from '@/interfaces/Vestnik-interface'
import { appApi } from '../api'
import { IApiPaginationDto } from '../api-pagination-dto'

export const vestnikApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchVestnik: build.query<IVestnikArhiv[], null>({
			query: () => ({
				url: 'vestnik',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'VESTNIK' }]
		}),
		fetchArchivById: build.query<IVestnikArhiv, number>({
			query: id => ({ url: `vestnik/${id}` }),
			providesTags: () => [{ type: 'VESTNIK' }]
		}),
		fetchMaterialsByCategory: build.query<
			IVestnikPagination,
			{ id: number; query?: IApiPaginationDto }
		>({
			query: ({ id, query }) => ({
				url: `vestnik/materials/category/${id}?page=${query?.page}&limit=${query.limit}`
			}),
			providesTags: () => [{ type: 'VESTNIK' }]
		}),
		fetchMaterialById: build.query<IVestnikMaterial, number>({
			query: id => ({ url: `vestnik/material/${id}` }),
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
		}),
		createMaterial: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `vestnik/material/${id}`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		}),
		updateMaterial: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `vestnik/material/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		}),
		deleteMaterial: build.mutation<void, number>({
			query: id => ({
				url: `vestnik/material/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'VESTNIK' }]
		})
	})
})
