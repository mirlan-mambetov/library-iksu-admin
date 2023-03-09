import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { APP_HOST } from '../services/base.service'
import { TypeRootState } from '../store'

export const appApi = createApi({
	reducerPath: 'api',
	tagTypes: [
		'Profile',
		'Pages',
		'TABS',
		'ARRIVALS',
		'PARTNERS',
		'ABOUT',
		'OWNER',
		'TABLO',
		'SERVICES',
		'VESTNIK'
	],
	baseQuery: fetchBaseQuery({
		baseUrl: APP_HOST,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		}
	}),
	endpoints: build => ({})
})
