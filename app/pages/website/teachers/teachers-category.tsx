import { teachersApi } from '@/../api/teachers/teachers-api'
import { ButtonComponent, Pagination } from '@/components'
import { useModalComponent } from '@/hooks/use.modal'
import { Layout } from '@/layout/Layout'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

export const TeachersCategory: FC = () => {
	const { handlerOpen } = useModalComponent()
	const [page, setPage] = useState(1)
	const { query } = useRouter()
	const { data: category, isLoading } = teachersApi.useFetchOneCategoryQuery(
		Number(query.id),
		{ skip: !query.id }
	)
	const { data: works, isLoading: loadingWorks } =
		teachersApi.useFetchWorksByCategoryQuery(
			{ id: Number(query.id), query: { page } },
			{ skip: !query.id }
		)
	const [deleteWork] = teachersApi.useDeleteTeachersWorkMutation()
	const paginateHandler = ({ selected }: { selected: number }) => {
		setPage(selected + 1)
	}
	return (
		<Layout title={`Категория ${category ? category.name : 'Загрузка'}`}>
			{isLoading ? (
				<span>Идет загрузка..</span>
			) : (
				<Box>
					<Text fontSize='2xl'>Категория: {category?.name}</Text>
					<Text mt={2} fontSize='sm'>
						всего материалов: {category?.works.length}
					</Text>
					<ButtonComponent
						btnType='Insert'
						size='xs'
						mt={3}
						onClick={() =>
							handlerOpen(category.id, 'CREATETEACHERSWORK', 'ADD')
						}
					/>
					{/* Works list */}
					{loadingWorks ? (
						<span>загрузка работ...</span>
					) : (
						<Box
							sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
							mt={5}
						>
							{works?.items.map(work => (
								<Box
									key={work.id}
									sx={{ border: '1px solid #e3e3e3', padding: '12px' }}
								>
									<Text>
										<span style={{ fontSize: '12px' }}>Авторы:</span>{' '}
										{work.authors}
									</Text>
									<Text>
										<span style={{ fontSize: '12px' }}>Название:</span>{' '}
										{work.name}
									</Text>
									<Text>
										<span style={{ fontSize: '12px' }}>Описание:</span>{' '}
										{work.description}
									</Text>
									<a
										style={{ textDecoration: 'underline' }}
										href={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}${work.file}`}
										target='_blank'
										rel='noreferrer'
									>
										Файл
									</a>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '12px',
											borderTop: '1px solid #e3e3e3',
											py: '10px'
										}}
										mt={4}
									>
										<Text fontSize='xx-small' textTransform='uppercase'>
											Просмотров - {work.views}
										</Text>
										<Text fontSize='xx-small' textTransform='uppercase'>
											Скачиваний - {work.downloaded}
										</Text>
									</Box>
									<Box sx={{ display: 'flex', gap: '12px' }}>
										<ButtonComponent
											btnType='Update'
											size='xs'
											onClick={() =>
												handlerOpen(work.id, 'UPDATETEACHERWORK', 'UPDATE')
											}
										/>
										<ButtonComponent
											btnType='Delete'
											size='xs'
											onClick={() => deleteWork(work.id)}
										/>
									</Box>
								</Box>
							))}
						</Box>
					)}
					<Pagination
						handler={paginateHandler}
						initialPage={page - 1}
						totalPage={works?.meta ? works.meta.totalPages : 1}
					/>
				</Box>
			)}
		</Layout>
	)
}
