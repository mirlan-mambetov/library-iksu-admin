import { vestnikApi } from '@/../api/vestnik/Vestnik-api'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Box, Button, Text } from '@chakra-ui/react'
import { FC, useContext, useState } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { Pagination } from '../pagination/Pagination'
import { GiConfirmed } from 'react-icons/gi'

export const VestnikMaterials: FC<{ id: number }> = ({ id }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const [page, setPage] = useState(1)
	const [confirm, setConfirm] = useState(false)
	const [deleteMaterial, { isLoading }] = vestnikApi.useDeleteMaterialMutation()
	const { data: materials } = vestnikApi.useFetchMaterialsByCategoryQuery(
		{
			id,
			query: { page, limit: 10 }
		},
		{ skip: !id }
	)
	const paginateHandler = ({ selected }: { selected: number }) => {
		setPage(selected + 1)
	}

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				{materials?.items.map(item => (
					<Box
						key={item.id}
						mt={4}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '12px',
							borderBottom: '1px solid #e3e3e3',
							boxShadow: '1px 1px 6px 0px rgba(34, 60, 80, 0.2)',
							p: '12px'
						}}
					>
						<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<Text fontSize='xx-small' textTransform='uppercase'>
								Авторы:
							</Text>
							<Text fontSize='16px'>{item.authors}</Text>
						</Box>
						<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<Text fontSize='xx-small' textTransform='uppercase'>
								Название:
							</Text>
							<Text fontSize='16px'>{item.name}</Text>
						</Box>
						<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<Text fontSize='xx-small' textTransform='uppercase'>
								Описание:
							</Text>
							<Text fontSize='16px'>
								{item.description ? item.description : 'Описание отсуствует'}
							</Text>
						</Box>
						<a
							style={{ textDecoration: 'underline' }}
							href={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${item.file}`}
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
								Просмотров - {item.views}
							</Text>
							<Text fontSize='xx-small' textTransform='uppercase'>
								Скачиваний - {item.downloaded}
							</Text>
						</Box>
						<Box sx={{ display: 'flex', gap: '12px' }}>
							<ButtonComponent
								btnType='Update'
								size='xs'
								onClick={() =>
									handlerOpen(item.id, 'UPDATEVESTNIKMATERIAL', 'UPDATE')
								}
							/>
							<ButtonComponent
								btnType='Delete'
								size='xs'
								onClick={() => deleteMaterial(item.id)}
							/>
						</Box>
					</Box>
				))}
				<Pagination
					handler={paginateHandler}
					initialPage={page - 1}
					totalPage={materials?.meta ? materials.meta.totalPages : 1}
				/>
			</Box>
		</>
	)
}
