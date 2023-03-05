import { IArrivalImage } from '@/interfaces/Arrival-interface'
import { appApi } from '../api'

export const arrivalApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchAllArrivalImages: build.query<IArrivalImage[], null>({
			query: () => ({
				url: 'arrival/images',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'ARRIVALS' }]
		}),
		updateArrivalImage: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `arrival/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'ARRIVALS' }]
		})
	})
})
