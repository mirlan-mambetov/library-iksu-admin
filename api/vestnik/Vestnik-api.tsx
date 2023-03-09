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
		})
	})
})
