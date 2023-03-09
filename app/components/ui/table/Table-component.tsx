import { FC } from 'react'
import { ITableProps } from './Table-props'
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import { ButtonComponent } from '../button/ButtonComponent'
import { formatDate } from '../../../../utils/Format-date'

export const TableComponent: FC<ITableProps> = ({ data }) => {
	return (
		<TableContainer mt={10}>
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
								<ButtonComponent btnType='Update' size='xs' />
								{!item.materials.length && (
									<ButtonComponent btnType='Delete' size='xs' />
								)}
							</Th>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
