import { aboutInfoApi } from '@/../api/about/about-info/about-info-api'
import { pageApi } from '@/../api/pages/page-api'
import { ButtonComponent, Hero, SpinnerComponent, Tabs } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Box, Image, Text } from '@chakra-ui/react'
import { FC, useContext } from 'react'

export const About: FC = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { isLoading, data: Page } = pageApi.useFetchPageQuery(
		PagesConstance.ABOUTPAGE
	)
	const { data: aboutInfo } = aboutInfoApi.useFetchInfoQuery(null)

	return (
		<Layout title='Страница о библиотеке'>
			{isLoading && <SpinnerComponent />}
			{/* Hero */}
			{Page && <Hero data={Page.hero} />}
			{/* Tabs */}
			{Page?.tabs && (
				<Tabs
					tabs={Page.tabs}
					pageId={PagesConstance.ABOUTPAGE}
					tabsTitle='Табы'
				/>
			)}
			{/* ABOUT INFO */}
			<Box mt={3}>
				<Text fontSize='2xl' my={5}>
					Информация о библиотеке
				</Text>
				<Box
					mt={2}
					sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
				>
					{aboutInfo &&
						aboutInfo.map(info => (
							<Box
								key={info.id}
								sx={{ border: '1px solid #e3e3e3', p: '10px' }}
							>
								<Text fontSize='24px' mb={3}>
									{info.title}
								</Text>
								<Text fontSize='16px'>{info.description}</Text>
								{info.image && (
									<Box mt={4}>
										<Image
											w={320}
											src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${info.image}`}
										/>
									</Box>
								)}
								<ButtonComponent
									btnType='Update'
									mt={3}
									size='sm'
									onClick={() =>
										handlerOpen(info.id, 'UPDATEABOUTINFO', 'UPDATE')
									}
								/>
							</Box>
						))}
				</Box>
			</Box>
		</Layout>
	)
}
