import { newsApi } from '@/../api/news/news-api'
import { pageApi } from '@/../api/pages/page-api'
import { Hero, NewsCard, Pagination, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC, useState } from 'react'

export const News: FC = () => {
	const [page, setPage] = useState(1)
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.NEWSARHIVPAGE
	)
	const { data: newses, isLoading: newsLoading } = newsApi.useFetchAllNewsQuery(
		{
			query: { page, limit: 10 }
		}
	)
	const paginateHandler = ({ selected }: { selected: number }) => {
		setPage(selected + 1)
	}

	return (
		<Layout title='Страница новости'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* NEWS */}
			<NewsCard data={newses?.items} />
			<Pagination
				handler={paginateHandler}
				initialPage={page - 1}
				totalPage={newses?.meta ? newses.meta.totalPages : 1}
			/>
		</Layout>
	)
}
