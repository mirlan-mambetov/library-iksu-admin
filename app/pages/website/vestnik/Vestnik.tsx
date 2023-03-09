import { pageApi } from '@/../api/pages/page-api'
import { vestnikApi } from '@/../api/vestnik/Vestnik-api'
import { Hero, SpinnerComponent, TableComponent, Tabs } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { IVestnikArhiv } from '@/interfaces/Vestnik-interface'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'

export const Vestnik: FC = () => {
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.VESTNIKPAGE
	)
	const { data: vestnikData } = vestnikApi.useFetchVestnikQuery(null)

	return (
		<Layout title='Страница вестник'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* Tabs */}
			<Tabs
				pageId={PagesConstance.VESTNIKPAGE}
				tabs={Page?.tabs}
				tabsTitle='Информация в табах'
			/>
			{/* VESTNIK ARCHIV */}
			<TableComponent data={vestnikData} pageId={PagesConstance.VESTNIKPAGE} />
		</Layout>
	)
}
