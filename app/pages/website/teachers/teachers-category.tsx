import { teachersApi } from '@/../api/teachers/teachers-api'
import { Pagination } from '@/components'
import { Layout } from '@/layout/Layout'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

export const TeachersCategory: FC = () => {
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
					{/* Works list */}
					{loadingWorks ? (
						<span>загрузка работ...</span>
					) : (
						works?.items.map(work => (
							<Box key={work.id} sx={{ border: '1px solid #e3e3e3' }}>
								<Text>{work.authors}</Text>
								<Text>{work.description}</Text>
								<Text>{work.name}</Text>
							</Box>
						))
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
