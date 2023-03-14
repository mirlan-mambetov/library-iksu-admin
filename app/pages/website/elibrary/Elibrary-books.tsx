import { elibraryApi } from '@/../api/elibrary/elibrary-api'
import { Books, ButtonComponent, Pagination } from '@/components'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState, useContext } from 'react'

export const ElibraryBooks: FC = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const router = useRouter()
	const [page, setPage] = useState(1)
	const { data: category, isLoading } =
		elibraryApi.useFetchSecondCategoryByIdQuery(Number(router.query.id), {
			skip: !router.query.id
		})
	const { data: books } = elibraryApi.useFetchBooksByCategoryQuery(
		{ id: Number(router.query.id), query: { page, limit: 10 } },
		{
			skip: !router.query.id
		}
	)
	const paginateHandler = ({ selected }: { selected: number }) => {
		setPage(selected + 1)
	}
	return (
		<Layout
			title={`Электронная библиотека - книги ${category ? category.name : ''}`}
		>
			{isLoading ? (
				<span>Загрузка данных...</span>
			) : (
				<Box>
					<Text>Категория: {category?.name}</Text>
					<Text my={1} fontSize='12px'>
						всего книг: {books?.meta.totalItems}
					</Text>
					<ButtonComponent
						btnType='Insert'
						size='xs'
						my={4}
						onClick={() =>
							handlerOpen(category.id, 'CREATEELIBRARYBOOK', 'ADD')
						}
					/>
					{/* Books displayed */}
					<Books data={books?.items} />
					<Pagination
						handler={paginateHandler}
						initialPage={page - 1}
						totalPage={books?.meta ? books.meta.totalPages : 1}
					/>
				</Box>
			)}
		</Layout>
	)
}
