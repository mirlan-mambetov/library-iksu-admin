import { IAboutOwner } from '@/interfaces/About-interface'
import { appApi } from '../../api'

export const ownerApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchOwner: build.query<IAboutOwner[], null>({
			query: () => ({
				url: 'about/owner'
			}),
			providesTags: () => [{ type: 'OWNER' }]
		}),
		updateOwner: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `about/owner/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'OWNER' }]
		})
	})
})
