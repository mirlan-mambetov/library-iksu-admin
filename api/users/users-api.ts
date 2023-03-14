import { IUser, IUserDto } from '@/interfaces/User-interface'
import { appApi } from '../api'

export const userApi = appApi.injectEndpoints({
	endpoints: build => ({
		fetchUsers: build.query<IUser[], null>({
			query: () => ({
				url: 'users',
				method: 'Get',
				credentials: 'include'
			}),
			providesTags: () => [{ type: 'USERS' }]
		}),
		createUser: build.mutation<null, IUserDto>({
			query: body => ({
				url: 'auth/register',
				method: 'Post',
				body
			}),
			invalidatesTags: () => [{ type: 'USERS' }]
		})
	})
})
