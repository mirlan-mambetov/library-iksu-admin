import { ITeachers, ITeachersWorks } from '@/interfaces/Teachers-interface'
import { appApi } from '../api'
import { IApiMetaDto, IApiPaginationDto } from '../api-pagination-dto'

export const teachersApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchAllCategory: build.query<ITeachers[], null>({
			query: () => ({ url: 'teachers' }),
			providesTags: () => [{ type: 'TEACHERS' }]
		}),
		fetchOneCategory: build.query<ITeachers, number>({
			query: id => ({ url: `teachers/${id}` }),
			providesTags: () => [{ type: 'TEACHERS' }]
		}),
		fetchWorksByCategory: build.query<
			IApiMetaDto<ITeachersWorks>,
			{ id: number; query?: IApiPaginationDto }
		>({
			query: ({ id, query }) => ({
				url: `teachers/works/category/${id}?page=${query?.page}`
			}),
			providesTags: () => [{ type: 'TEACHERS' }]
		}),
		fetchOneWork: build.query<ITeachersWorks, number>({
			query: id => ({
				url: `teachers/works/${id}`,
				method: 'Get'
			}),
			providesTags: () => [{ type: 'TEACHERS' }]
		}),
		createTeachersCategory: build.mutation<
			null,
			{ body: Pick<ITeachers, 'name' | 'description'> }
		>({
			query: ({ body }) => ({
				url: 'teachers',
				method: 'Post',
				body
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		}),
		updateTeachersCategory: build.mutation<
			null,
			{ id: number; body: Pick<ITeachers, 'name' | 'description'> }
		>({
			query: ({ id, body }) => ({
				url: `teachers/${id}`,
				method: 'Put',
				body
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		}),
		deleteTeachersCategory: build.mutation<null, number>({
			query: id => ({
				url: `teachers/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		}),
		createTeachersWork: build.mutation<null, { id: number; body: FormData }>({
			query: ({ id, body }) => ({
				url: `teachers/works/${id}`,
				method: 'Post',
				body
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		}),
		updateTeachersWork: build.mutation<null, { id: number; body: FormData }>({
			query: ({ id, body }) => ({
				url: `teachers/works/${id}`,
				method: 'Put',
				body
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		}),
		deleteTeachersWork: build.mutation<null, number>({
			query: id => ({
				url: `teachers/works/${id}`,
				method: 'Delete'
			}),
			invalidatesTags: () => [{ type: 'TEACHERS' }]
		})
	})
})
