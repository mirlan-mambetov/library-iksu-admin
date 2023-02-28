import {  Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import {FC, useContext} from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { HeroProps } from './Hero.props'
import {formatDate} from '@/utils/Format-date'
import {ModalComponentInitialContext} from '@/contexts/Modal-component'

export const Hero: FC<HeroProps> = ({data}) => {
  const {handlerOpen} = useContext(ModalComponentInitialContext)
  
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
									type='Update'
									onClick={() => handlerOpen(h.id, 'UPDATEHERO', 'UPDATE')}
								/>
								<Text sx={{ mt: '20px' }} fontSize='xs'>
									Последнее изменение:{' '}
									{formatDate(h.updatedAt, 'YYYY-MM-DD - HH:mm:ss')}{' '}
								</Text>
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
