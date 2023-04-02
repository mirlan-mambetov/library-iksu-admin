import { INews } from '@/interfaces/News-interface'
import { appApi } from '../api'
import { IApiMetaDto, IApiPaginationDto } from '../api-pagination-dto'

export const newsApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchAllNews: build.query<
			IApiMetaDto<INews>,
			{ query?: IApiPaginationDto }
		>({
			query: ({ query }) => ({
				url: `/news?page=${query?.page}&limit=${query?.limit}`
			}),
			providesTags: ['NEWS']
		}),
		fetchNewsById: build.query<INews, number>({
			query: id => ({
				url: `/news/news/${id}`
			}),
			providesTags: ['NEWS']
		}),
		createNews: build.mutation<null, FormData>({
			query: body => ({
				url: 'news',
				method: 'Post',
				body
			}),
			invalidatesTags: () => [{ type: 'NEWS' }]
		}),
		updateNews: build.mutation<null, { id: number; data: FormData }>({
			query: ({ id, data }) => ({
				url: `news/${id}`,
				method: 'Put',
				body: data
			}),
			invalidatesTags: () => [{ type: 'NEWS' }]
		}),
		deleteNews: build.mutation<null, number>({
			query: id => ({
				url: `news/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'NEWS' }]
		})
	})
})
