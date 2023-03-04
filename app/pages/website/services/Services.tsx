import { pageApi } from '@/../api/pages/page-api'
import { Layout } from '@/layout/Layout'
import { PagesConstance } from '@/constance/Pages-constance'
import { FC } from 'react'
import { Hero, SpinnerComponent, Tabs } from '@/components'

export const Services: FC = () => {
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.SERVICEPAGE
	)

	return (
		<Layout title='Страница сервисы'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* Tabs */}
			{Page?.tabs && <Tabs tabs={Page.tabs} />}
		</Layout>
	)
}
