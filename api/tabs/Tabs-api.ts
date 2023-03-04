import { ITabs, ITabsLink } from '@/interfaces/Tabs-interface'
import { appApi } from '../api'

interface ITabsDto {
	title: string
	description?: string
}
export const tabsApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchTabById: build.query<ITabs, number>({
			query: id => ({
				url: `tabs/${id}`
			}),
			providesTags: () => [{ type: 'TABS' }]
		}),
		updateTabById: build.mutation<null, { id: number; data: ITabsDto }>({
			query: ({ id, ...body }) => ({
				url: `tabs/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		}),
		updateTabLinkById: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `tabs/tablink/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		}),
		createTab: build.mutation<null, { id: number; data: ITabsDto }>({
			query: ({ id, ...body }) => ({
				url: `tabs/${id}`,
				method: 'Post',
				body
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		}),
		createTabLinkById: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `tabs/tablink/${id}`,
				method: 'Post',
				body: data
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		}),
		deleteTabLinkById: build.mutation<null, number>({
			query: id => ({
				url: `tabs/tablink/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		}),
		deleteTab: build.mutation<null, number>({
			query: id => ({
				url: `tabs/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: (res, err) => [{ type: 'Pages' }]
		})
	})
})
