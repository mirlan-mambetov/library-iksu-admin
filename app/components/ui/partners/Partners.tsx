import { partnersApi } from '@/../api/partners/partners-api'
import { DialogContext } from '@/contexts/Dialog-context'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { IPartners } from '@/interfaces/Partners-interface'
import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	SimpleGrid,
	Text
} from '@chakra-ui/react'
import { FC, useContext, useEffect } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { LastTime } from '../last-time/Last-time'

export const Partners: FC<{ data: IPartners[] }> = ({ data }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { confirm, deletedId, onClose, onOpen } = useContext(DialogContext)
	const [deleteParnter] = partnersApi.useDeletePartnerMutation()

	return (
		<>
			<Text my={3} fontSize='2xl'>
				Партнеры
			</Text>
			<ButtonComponent
				btnType='Insert'
				mb={3}
				onClick={() => handlerOpen(null, 'CREATEPARTNER', 'ADD')}
			/>
			<SimpleGrid
				spacing={2}
				templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
			>
				{data &&
					data.map(card => (
						<Card key={card.id}>
							<CardHeader>
								<Heading size='xs'>индекс: {card.id}</Heading>
							</CardHeader>
							<CardBody>
								<Image
									src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${card.image}`}
									width={200}
									height={50}
								/>
								<Text fontSize='xs' mt={5}>
									Ссылка:
									<a
										style={{
											color: 'red',
											textDecoration: 'underline',
											marginLeft: '20px'
										}}
										href={card.link}
										target='_blank'
										rel='noreferrer'
									>
										{card.link}
									</a>
								</Text>
							</CardBody>
							<CardFooter>
								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
								>
									<Box sx={{ display: 'flex', gap: '20px' }}>
										<ButtonComponent
											btnType='Update'
											size='xs'
											onClick={() =>
												handlerOpen(card.id, 'UPDATEPARTNERS', 'UPDATE')
											}
										/>
										<ButtonComponent
											btnType='Delete'
											size='xs'
											onClick={() => deleteParnter(card.id)}
										/>
									</Box>
									<LastTime data={card.updatedAt} fontSize='xx-small' />
								</Box>
							</CardFooter>
						</Card>
					))}
			</SimpleGrid>
		</>
	)
}
