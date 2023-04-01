import { IJournal, IJournalHeadItems } from '@/interfaces/Journal-interface'
import { appApi } from '../api'

export const journalApi = appApi.injectEndpoints({
	endpoints: build => ({
		updateJournal: build.mutation<
			null,
			{ id: number; body: Pick<IJournal, 'title' | 'subtitle' | 'description'> }
		>({
			query: ({ id, body }) => ({
				url: `journal/${id}`,
				method: 'Put',
				body
			}),
			invalidatesTags: () => [{ type: 'Pages' }]
		}),
		updateJournalHead: build.mutation<null, { id: number; body: string }>({
			query: ({ id, body }) => ({
				url: `/journal/journalhead/${id}`,
				method: 'Put',
				body
			}),
			invalidatesTags: () => [{ type: 'Pages' }]
		}),
		updateJournalHeadItems: build.mutation<
			null,
			{ id: number; body: IJournalHeadItems }
		>({
			query: ({ id, body }) => ({
				url: `journal/journalheaditems/${id}`,
				method: 'Put',
				body
			}),
			invalidatesTags: () => [{ type: 'Pages' }]
		})
	})
})
