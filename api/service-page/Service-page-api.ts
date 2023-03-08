import { IServices } from '@/interfaces/Services-interface'
import { appApi } from '../api'

export const servicePageApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchServices: build.query<IServices[], null>({
			query: () => ({
				url: 'imagecard',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'SERVICES' }]
		}),
		updateServices: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `imagecard/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'SERVICES' }]
		})
	})
})
