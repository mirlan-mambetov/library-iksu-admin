import { IArrivalImage } from '@/interfaces/Arrival-interface'
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	SimpleGrid,
	Text
} from '@chakra-ui/react'
import { FC, useContext } from 'react'
import { ButtonComponent, LastTime } from '@/components'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'

export const ImageCard: FC<{
	data: IArrivalImage[]
	componentTitle: string
}> = ({ data, componentTitle }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)

	return (
		<>
			<Text my={3} fontSize='2xl'>
				{componentTitle}
			</Text>
			<SimpleGrid
				spacing={2}
				templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
			>
				{data ? (
					data.map(card => (
						<Card key={card.id}>
							<CardHeader>
								<Heading size='xs'>{card.id}</Heading>
							</CardHeader>
							<CardBody>
								<Image
									src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${card.image}`}
									width={200}
									height={260}
								/>
							</CardBody>
							<CardFooter>
								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
								>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(card.id, 'UPDATEARRIVALIMAGE', 'UPDATE')
										}
									/>
									<LastTime data={card.createdAt} fontSize='xx-small' />
								</Box>
							</CardFooter>
						</Card>
					))
				) : (
					<span>Данных нет..</span>
				)}
			</SimpleGrid>
		</>
	)
}
