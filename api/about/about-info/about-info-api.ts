import { IAboutInfo } from '@/interfaces/About-interface'
import { appApi } from '../../api'

export const aboutInfoApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchInfo: build.query<IAboutInfo[], null>({
			query: () => ({
				url: 'about/info',
				method: 'Get'
			}),
			providesTags: () => [{ type: 'ABOUT' }]
		}),
		fetchAboutInfoById: build.query<IAboutInfo, number>({
			query: id => ({
				url: `about/info/${id}`
			}),
			providesTags: ['ABOUT']
		}),
		updateInfo: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `about/info/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'ABOUT' }]
		})
	})
})
