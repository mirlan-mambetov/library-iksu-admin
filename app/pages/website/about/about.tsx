import { aboutInfoApi } from '@/../api/about/about-info/about-info-api'
import { ownerApi } from '@/../api/about/owner/onwer-api'
import { tabloApi } from '@/../api/about/tablo/Tablo-api'
import { pageApi } from '@/../api/pages/page-api'
import {
	ButtonComponent,
	Hero,
	LastTime,
	SpinnerComponent,
	Tabs
} from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import {
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Text
} from '@chakra-ui/react'
import { FC, useContext } from 'react'

export const About: FC = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { isLoading, data: Page } = pageApi.useFetchPageQuery(
		PagesConstance.ABOUTPAGE
	)
	const { data: aboutInfo } = aboutInfoApi.useFetchInfoQuery(null)
	const { data: aboutOwner } = ownerApi.useFetchOwnerQuery(null)
	const { data: aboutTablo } = tabloApi.useFetchTabloQuery(null)

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
			{/* ABOUT OWNER */}
			<Box my={10}>
				{aboutOwner &&
					aboutOwner.map(owner => (
						<Card key={owner.id} w={400}>
							<CardBody>
								<Image
									src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${owner.image}`}
								/>
								<Stack mt='6' spacing='3'>
									<Heading size='sm'>{owner.name}</Heading>
									<Text fontSize='sm'>
										E-mail:{' '}
										<a
											style={{
												color: 'red',
												marginLeft: '5px'
											}}
											href={`mailto:${owner.email}`}
										>
											{owner.email}
										</a>
									</Text>
									<Text fontSize='sm'>
										Телефон:{' '}
										<a
											style={{
												color: 'red',
												marginLeft: '5px'
											}}
											href={`tel:${owner.phone}`}
										>
											{owner.phone}
										</a>
									</Text>
								</Stack>
								<ButtonComponent
									onClick={() => handlerOpen(owner.id, 'UPDATEOWNER', 'UPDATE')}
									my={6}
									btnType='Update'
									size='sm'
								/>
							</CardBody>
						</Card>
					))}
			</Box>
			{/* ABOUT TABLO */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					border: '1px solid #e3e3e3',
					py: '30px'
				}}
			>
				{aboutTablo &&
					aboutTablo.map(tablo => (
						<Box key={tablo.id}>
							<Text fontSize='2xl' fontWeight='bold'>
								{tablo.ceils}
							</Text>
							<Text fontSize='medium' fontWeight='medium'>
								{tablo.description}
							</Text>
							<ButtonComponent
								btnType='Update'
								size='xs'
								my={3}
								onClick={() => handlerOpen(tablo.id, 'UPDATETABLO', 'UPDATE')}
							/>
							<LastTime data={tablo.updatedAt} fontSize='xs' />
						</Box>
					))}
			</Box>
			{/* TABS */}
			<Tabs
				pageId={PagesConstance.ABOUTPAGE}
				tabs={Page?.tabs}
				tabsTitle='Табы'
			/>
		</Layout>
	)
}
