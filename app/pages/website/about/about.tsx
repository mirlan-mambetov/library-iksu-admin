import { pageApi } from '@/../api/pages/page-api'
import { Hero } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'

export const About: FC = () => {
	const {isLoading, error, data: Page} = pageApi.useFetchPageQuery(PagesConstance.ABOUTPAGE)
	return (
		<Layout title='Website about page'>
			{/* Hero */}
			{Page && <Hero data={Page.hero}/>}
			<div>about</div>
		</Layout>
	)
}
