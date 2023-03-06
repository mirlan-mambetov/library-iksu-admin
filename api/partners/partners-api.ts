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
		})
	})
})
