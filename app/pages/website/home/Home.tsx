import { arrivalApi } from '@/../api/arrivals/arrivals-api'
import { pageApi } from '@/../api/pages/page-api'
import { Hero, ImageCard, SpinnerComponent, Tabs } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import styles from './Home.module.scss'

export const Home = () => {
	const { isLoading, data: Page } = pageApi.useFetchPageQuery(
		PagesConstance.MAINPAGE
	)
	const { data: arrivalImages } = arrivalApi.useFetchAllArrivalImagesQuery(null)

	return (
		<Layout title='Страница главная'>
			{isLoading && <SpinnerComponent />}
			{/* Hero */}
			<Hero data={Page?.hero} />
			{/* New arrivals with Tabs */}
			<Tabs
				tabs={Page?.tabs}
				pageId={PagesConstance.MAINPAGE}
				tabsTitle='Новые поступления'
			/>
			{/* Arrival images */}
			<ImageCard data={arrivalImages} componentTitle='Картинки' />
			<div className={styles.homeSection}></div>
		</Layout>
	)
}
