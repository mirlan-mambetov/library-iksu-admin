import { teachersApi } from '@/../api/teachers/teachers-api'
import { formatDate } from '@/../utils/Format-date'
import { useModalComponent } from '@/hooks/use.modal'
import { ITeachers } from '@/interfaces/Teachers-interface'
import {
	Box,
	Table,
	TableContainer,
	Tbody,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'

export const TeachersCategories: FC<{ data: ITeachers[] }> = ({ data }) => {
	const { handlerOpen } = useModalComponent()
	const [deleteCategory] = teachersApi.useDeleteTeachersCategoryMutation()

	return (
		<TableContainer mt={10}>
			<Box>
				<Text fontSize='2xl'>Категории</Text>
				<Box my={4}>
					<Text fontSize='small'>Всего категорий: {data?.length}</Text>
				</Box>
				<ButtonComponent
					my={1}
					btnType='Insert'
					size='xs'
					onClick={() => handlerOpen(null, 'CREATETEACHERSCATEGORY', 'ADD')}
				/>
			</Box>
			<Table>
				<Thead>
					<Tr>
						<Th>название категории</Th>
						<Th>всего материалов</Th>
						<Th>Дата создания</Th>
						<Th>Дата редактирования</Th>
						<Th>Действие</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map(category => (
						<Tr key={category.id}>
							<Th>
								<Link href={`/website/teachers/${category.id}`}>
									{category.name}
								</Link>
							</Th>
							<Th>{category.works?.length}</Th>
							<Th>{formatDate(category.createdAt, 'YYYY-MM-DD - HH:mm:ss')}</Th>
							<Th>{formatDate(category.updatedAt, 'YYYY-MM-DD - HH:mm:ss')}</Th>
							<Th sx={{ display: 'flex', gap: '5px' }}>
								<ButtonComponent
									btnType='Update'
									size='xs'
									onClick={() =>
										handlerOpen(category.id, 'UPDATETEACHERSCATEGORY', 'UPDATE')
									}
								/>
								{!category.works.length && (
									<ButtonComponent
										btnType='Delete'
										size='xs'
										onClick={() => deleteCategory(category.id)}
									/>
								)}
							</Th>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
