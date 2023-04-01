import { pageApi } from '@/../api/pages/page-api'
import { teachersApi } from '@/../api/teachers/teachers-api'
import { Hero, SpinnerComponent, TeachersCategories } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { FC, useEffect } from 'react'

export const Teachers: FC = () => {
	const { data: categories, isLoading: lodCategories } =
		teachersApi.useFetchAllCategoryQuery(null)
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.TEACHERSPAGE
	)
	return (
		<Layout title='Страница труды преподавателей'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* Categories */}
			{lodCategories ? (
				<span>загрузка категорий...</span>
			) : (
				<TeachersCategories data={categories} />
			)}
		</Layout>
	)
}
