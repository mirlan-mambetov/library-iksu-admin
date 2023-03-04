import { pageApi } from '@/../api/pages/page-api'
import { ButtonComponent, Hero, SpinnerComponent, Tabs } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Text } from '@chakra-ui/react'
import { useContext } from 'react'
import styles from './Home.module.scss'

export const Home = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { isLoading, data: Page } = pageApi.useFetchPageQuery(
		PagesConstance.MAINPAGE
	)

	return (
		<Layout title='Страница главная'>
			{isLoading && <SpinnerComponent />}
			{/* Hero */}
			<Hero data={Page?.hero} />
			{/* New arrivals with Tabs */}
			<Text mt='10' mb='4' fontSize='2xl'>
				Новые поступления
			</Text>
			<ButtonComponent
				btnType='Insert'
				size='sm'
				ml={2}
				mb={5}
				onClick={() => handlerOpen(PagesConstance.MAINPAGE, 'CREATETAB', 'ADD')}
			/>
			<Tabs tabs={Page?.tabs} />
			<div className={styles.homeSection}></div>
		</Layout>
	)
}
