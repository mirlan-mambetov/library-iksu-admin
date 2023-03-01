import { pageApi } from '@/../api/pages/page-api'
import { Hero, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'

export const WIndow: FC = () => {
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.WINDOWPAGE
	)

	return (
		<Layout title='Страница единок окно'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
		</Layout>
	)
}
