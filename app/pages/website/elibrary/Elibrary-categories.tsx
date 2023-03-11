import { elibraryApi } from '@/../api/elibrary/elibrary-api'
import { ButtonComponent } from '@/components'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useContext, useEffect, useState } from 'react'

export const ElibraryCategories: FC = () => {
	const [archivId, setArchivId] = useState(null)
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const router = useRouter()
	const [deleteCategory] = elibraryApi.useDeleteSecondCategoryMutation()
	const { data: category, isLoading } =
		elibraryApi.useFetchMainCategoriesByIdQuery(Number(router.query.id), {
			skip: !router.query.id
		})
	const { data: scategory } = elibraryApi.useFetchCategoryByMainCategoryQuery(
		Number(router.query.id),
		{
			skip: !router.query.id
		}
	)

	return (
		<Layout
			title={`Электронная библиотека - категория ${
				category ? category.name : ''
			}`}
		>
			{isLoading ? (
				<Box>
					<Text>Загрузка данных..</Text>
				</Box>
			) : (
				<Box>
					<Text fontSize='20px'>Категория: {category?.name}</Text>
					<Text fontSize='12px' my={1}>
						всего подкатегорий {category?.secondCategory.length}
					</Text>
					<ButtonComponent
						btnType='Insert'
						size='xs'
						my={3}
						onClick={() =>
							handlerOpen(category.id, 'CREATEELIBRARYSCATEGORY', 'ADD')
						}
					/>
					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
						pt={4}
					>
						{scategory?.map(categories => (
							<Box
								key={categories.id}
								sx={{ border: '1px solid #e3e3e3' }}
								p={3}
							>
								<Link href={`/website/elibrary/books/${categories.id}`}>
									{categories.name}
									<Text fontSize='12px' mt={1}>
										всего книг: {categories.books?.length}
									</Text>
								</Link>
								<Box sx={{ display: 'flex', gap: '10px' }} py={4}>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(
												categories.id,
												'UPDATEELIBRARYSCATEGORY',
												'UPDATE'
											)
										}
									/>
									{!categories.books.length && (
										<ButtonComponent
											btnType='Delete'
											size='xs'
											onClick={() => deleteCategory(categories.id)}
										/>
									)}
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			)}
		</Layout>
	)
}
