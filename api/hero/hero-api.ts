import { IHero } from '@/interfaces/Hero-interface'
import { appApi } from '../api'

export const heroApi = appApi.injectEndpoints({
	endpoints: build => ({
		updateHero: build.mutation<IHero, { data: FormData; id: number }>({
			query: ({ data, id }) => ({
				url: `hero/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: (result, error) => [{ type: 'Pages' }]
		})
	})
})
