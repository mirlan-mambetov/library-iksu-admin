import {
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Text
} from '@chakra-ui/react'
import { FC, useContext } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { HeroProps } from './Hero.props'
import { LastTime } from '@/components'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'

export const Hero: FC<HeroProps> = ({ data }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)

	return (
		<>
			{data ? (
				data.map(h => (
					<Card
						direction={{ base: 'column', sm: 'row' }}
						overflow='hidden'
						variant='outline'
						key={h.id}
					>
						<Image
							objectFit='cover'
							maxW={{ base: '100%', sm: 'md' }}
							height={'xs'}
							src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${h.background}`}
							alt='Hero background'
						/>
						<Stack>
							<CardBody>
								<Text fontSize='xs'>Заголовок</Text>
								<Heading mt={1} size='md'>
									{h.title}
								</Heading>
							</CardBody>
							<CardFooter sx={{ display: 'flex', flexDirection: 'column' }}>
								<ButtonComponent
									btnType='Update'
									onClick={() => handlerOpen(h.id, 'UPDATEHERO', 'UPDATE')}
								/>
								<LastTime data={h.updatedAt} mt={5} fontSize='small' />
							</CardFooter>
						</Stack>
					</Card>
				))
			) : (
				<span>wadwd</span>
			)}
		</>
	)
}
