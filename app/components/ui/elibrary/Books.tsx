import { IElibraryBooks } from '@/interfaces/Elibrary-interface'
import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

export const Books: FC<{ data: IElibraryBooks[] }> = ({ data }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} py={5}>
			{data ? (
				data.map(book => (
					<Box key={book.id} sx={{ border: '1px solid #e3e3e3' }} p={4}>
						<Text sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<span style={{ fontSize: '12px' }}>авторы:</span>
							{book.authors}
						</Text>
						<Text sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<span style={{ fontSize: '12px' }}>Название:</span>
							{book.name}
						</Text>
						<Text sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<span style={{ fontSize: '12px' }}>Описание:</span>
							{book.description}
						</Text>
						<Text sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<span style={{ fontSize: '12px' }}>Год издания:</span>
							{book.published}
						</Text>
						<Box
							my={3}
							sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}
						>
							<Text fontSize='12px'>
								Скачиваний: {''}
								{book.downloaded}
							</Text>
							<Text fontSize='12px'>
								Просмотров: {''}
								{book.views}
							</Text>
						</Box>
						<a
							style={{ textDecoration: 'underline' }}
							href={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${book.file}`}
							target='_blank'
							rel='noreferrer'
						>
							Файл
						</a>
					</Box>
				))
			) : (
				<span>Категория пуста...</span>
			)}
		</Box>
	)
}
