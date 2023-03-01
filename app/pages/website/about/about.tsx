import { pageApi } from '@/../api/pages/page-api'
import { Hero, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'

export const About: FC = () => {
	const { isLoading, data: Page } = pageApi.useFetchPageQuery(
		PagesConstance.ABOUTPAGE
	)
	return (
		<Layout title='Страница о библиотеке'>
			{isLoading && <SpinnerComponent />}
			{/* Hero */}
			{Page && <Hero data={Page.hero} />}
		</Layout>
	)
}
