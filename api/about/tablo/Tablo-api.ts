import { IAboutTablo } from '@/interfaces/About-interface'
import { appApi } from '../../api'

export const tabloApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchTablo: build.query<IAboutTablo[], null>({
			query: () => ({
				url: 'about/tablo',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'TABLO' }]
		}),
		updateTablo: build.mutation<null, { id: number; data: IAboutTablo }>({
			query: ({ id, data }) => ({
				url: `about/tablo/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'TABLO' }]
		})
	})
})
