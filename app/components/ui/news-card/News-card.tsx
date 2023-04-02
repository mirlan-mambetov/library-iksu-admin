import { newsApi } from '@/../api/news/news-api'
import { formatDate } from '@/../utils/Format-date'
import { useModalComponent } from '@/hooks/use.modal'
import { INews } from '@/interfaces/News-interface'
import {
	Box,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Text
} from '@chakra-ui/react'
import { FC } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { LastTime } from '../last-time/Last-time'

export const NewsCard: FC<{ data: INews[] }> = ({ data }) => {
	const { handlerOpen } = useModalComponent()
	const [deleteNews] = newsApi.useDeleteNewsMutation()
	return (
		<Box my={4}>
			<ButtonComponent
				btnType='Insert'
				size='xs'
				m={2}
				onClick={() => handlerOpen(null, 'NEWSCREATE', 'ADD')}
			/>
			<Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				{data?.map(news => (
					<Card maxW='sm' key={news.id}>
						<CardBody>
							<Image
								w={380}
								h={260}
								src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}${news.image}`}
								alt={news.title}
							/>
							<Stack mt='6' spacing='3'>
								<Heading size='md'>{news.title}</Heading>
								<Text
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: '2',
										margin: '10px 0px 10px 0px',
										overflow: 'hidden'
									}}
									title={news.description}
								>
									{news.description}
								</Text>
							</Stack>
						</CardBody>
						<CardFooter
							sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
						>
							<LastTime data={news.createdAt} />
							<ButtonGroup>
								<ButtonComponent
									btnType='Update'
									size='xs'
									onClick={() => handlerOpen(news.id, 'NEWSUPDATE', 'UPDATE')}
								/>
								<ButtonComponent
									btnType='Delete'
									size='xs'
									onClick={() => deleteNews(news.id)}
								/>
							</ButtonGroup>
						</CardFooter>
					</Card>
				))}
			</Box>
		</Box>
	)
}
