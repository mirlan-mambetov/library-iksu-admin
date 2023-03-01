import { pageApi } from '@/../api/pages/page-api'
import { Hero, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'

export const Rules: FC = () => {
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.RULESPAGE
	)

	return (
		<Layout title='Страница правила пользования'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
		</Layout>
	)
}
