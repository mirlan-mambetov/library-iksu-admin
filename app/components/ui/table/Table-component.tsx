import { FC, useContext } from 'react'
import { ITableProps } from './Table-props'
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	TableContainer,
	Box,
	Text
} from '@chakra-ui/react'
import { ButtonComponent } from '../button/ButtonComponent'
import { formatDate } from '../../../../utils/Format-date'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { vestnikApi } from '@/../api/vestnik/Vestnik-api'

export const TableComponent: FC<ITableProps> = ({ data, pageId }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const [deleteArchiv] = vestnikApi.useDeleteArchivMutation()
	return (
		<TableContainer mt={10}>
			<Box>
				<Text fontSize='2xl'>Архивы</Text>
				<Box my={4}>
					<Text fontSize='small'>Всего архивов: {data?.length}</Text>
				</Box>
				<ButtonComponent
					my={1}
					btnType='Insert'
					onClick={() => handlerOpen(pageId, 'CREATEVESTNIKARCHIV', 'ADD')}
				/>
			</Box>
			<Table>
				<Thead>
					<Tr>
						<Th>название архива</Th>
						<Th>всего материалов</Th>
						<Th>Дата создания</Th>
						<Th>Дата редактирования</Th>
						<Th>Действие</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data?.map(item => (
						<Tr key={item.id}>
							<Th>{item.name}</Th>
							<Th>{item.materials?.length}</Th>
							<Th>{formatDate(item.createdAt, 'YYYY-MM-DD - HH:mm:ss')}</Th>
							<Th>{formatDate(item.updatedAt, 'YYYY-MM-DD - HH:mm:ss')}</Th>
							<Th sx={{ display: 'flex', gap: '5px' }}>
								<ButtonComponent
									btnType='Update'
									size='xs'
									onClick={() =>
										handlerOpen(item.id, 'UPDATEVESTNIKARCHIV', 'UPDATE')
									}
								/>
								{!item.materials.length && (
									<ButtonComponent
										btnType='Delete'
										size='xs'
										onClick={() => deleteArchiv(item.id)}
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
