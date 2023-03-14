import { userApi } from '@/../api/users/users-api'
import { useModalComponent } from '@/hooks/use.modal'
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
import { FC } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'

export const UserList: FC = () => {
	const { data: users, isLoading } = userApi.useFetchUsersQuery(null)

	const { handlerOpen } = useModalComponent()

	return (
		<>
			{isLoading ? (
				<span>загрузка пользователей</span>
			) : (
				<TableContainer mt={10}>
					<Box>
						<Text fontSize='2xl'>Пользователи</Text>
						<Box my={4}>
							<Text fontSize='small'>Всего 22</Text>
						</Box>
						<ButtonComponent
							my={1}
							btnType='Insert'
							size='xs'
							onClick={() => handlerOpen(null, 'CREATEUSER', 'ADD')}
						/>
					</Box>
					<Table py={5}>
						<Thead>
							<Tr>
								<Th>E-mail</Th>
								<Th>Имя</Th>
								<Th>Дата регистрации</Th>
								<Th>Действие</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users?.map(user => (
								<Tr key={user.id}>
									<Th>{user.name}</Th>
									<Th>
										<ButtonComponent btnType='Update' size='xs' />
									</Th>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}
