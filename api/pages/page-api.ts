import { IPage } from '@/interfaces/Page-interface'
import {appApi}from '../api'

export const pageApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPages: build.query<IPage[], null>({
      query: () => ({
        method: "Get",
        url: 'page'
      })
    }),
    fetchPage: build.query<IPage, number>({
      query: (pageId) => ({
        method: "Get",
        url: `page/${pageId}`
      }),
      providesTags: (res, err, id) => [{type: "Pages", id}]
    })
  })
})