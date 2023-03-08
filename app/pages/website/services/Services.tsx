import { pageApi } from '@/../api/pages/page-api'
import { Layout } from '@/layout/Layout'
import { PagesConstance } from '@/constance/Pages-constance'
import { FC, useContext } from 'react'
import {
	ButtonComponent,
	Hero,
	LastTime,
	SpinnerComponent,
	Tabs
} from '@/components'
import { servicePageApi } from '@/../api/service-page/Service-page-api'
import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	Text
} from '@chakra-ui/react'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'

export const Services: FC = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.SERVICEPAGE
	)
	const { data: servicesData } = servicePageApi.useFetchServicesQuery(null)

	return (
		<Layout title='Страница сервисы'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* SERVICE */}

			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				{servicesData &&
					servicesData.map(sdata => (
						<Card key={sdata.id}>
							<CardHeader>
								<Heading size='md'>{sdata.title}</Heading>
							</CardHeader>
							<CardBody>
								<Image
									src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${sdata.image}`}
									width={350}
									height={'auto'}
								/>
								<Text mt={3} fontSize='24px'>
									{sdata.subtitle}
								</Text>
								<Text my={3}>{sdata.description}</Text>
							</CardBody>
							<CardFooter>
								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
								>
									<ButtonComponent
										btnType='Update'
										size='sm'
										onClick={() =>
											handlerOpen(sdata.id, 'UPDATESERVICES', 'UPDATE')
										}
									/>
									<LastTime data={sdata.updatedAt} fontSize='small' />
								</Box>
							</CardFooter>
						</Card>
					))}
			</Box>
			{/* Tabs */}
			{Page?.tabs && (
				<Tabs
					tabs={Page.tabs}
					pageId={PagesConstance.SERVICEPAGE}
					tabsTitle='Табы'
				/>
			)}
		</Layout>
	)
}
