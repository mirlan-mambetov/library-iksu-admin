import { pageApi } from '@/../api/pages/page-api'
import { Hero, SpinnerComponent, Tabs } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { Text } from '@chakra-ui/react'
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
			{/* Tabs */}
			<Text mt={4} mb={2} fontSize='2xl'>
				Табы
			</Text>
			{Page?.tabs && <Tabs tabs={Page.tabs} />}
		</Layout>
	)
}
