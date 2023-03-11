import { elibraryApi } from '@/../api/elibrary/elibrary-api'
import { pageApi } from '@/../api/pages/page-api'
import { ButtonComponent, Hero, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Box, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, useContext } from 'react'

export const Elibrary: FC = () => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const [deleteCategory] = elibraryApi.useDeleteMainCategoryMutation()
	const { data: Page, isLoading } = pageApi.useFetchPageQuery(
		PagesConstance.ELIBRARY
	)
	const { data: eCategories, isLoading: loadingCategories } =
		elibraryApi.useFetchAllMainCategoriesQuery(null)

	return (
		<Layout title='Страница электронная библиотека'>
			{isLoading && <SpinnerComponent />}
			{/* HERO */}
			<Hero data={Page?.hero} />
			{/* ELIBRARY MAIN CATEGORIES */}
			<Box pt={5}>
				<Text fontSize='2xl'>Категории</Text>
				<ButtonComponent
					btnType='Insert'
					size='xs'
					my={3}
					onClick={() => handlerOpen(null, 'CREATEELIBRARYMAINCATEGORY', 'ADD')}
				/>
				<Box
					sx={{
						display: 'flex',
						gap: '15px',
						flexWrap: 'wrap'
					}}
					mt={5}
				>
					{loadingCategories ? (
						<span>Загрузка категорий..</span>
					) : (
						eCategories.map(categories => (
							<Box
								key={categories.id}
								sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
							>
								<Link href={`/website/elibrary/${categories.id}`}>
									<Box>
										<Image
											w={240}
											h={140}
											src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}/${categories.image}`}
										/>
										<Text fontSize='20px'>{categories.name}</Text>
										<Text mt={1} fontSize='13px'>
											Всего подкатегорий: {categories.secondCategory.length}
										</Text>
									</Box>
								</Link>
								<Box my={4} sx={{ display: 'flex', gap: '12px' }}>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(
												categories.id,
												'UPDATEELIBRARYMAINCATEGORY',
												'UPDATE'
											)
										}
									/>
									{!categories.secondCategory.length && (
										<ButtonComponent
											btnType='Delete'
											size='xs'
											onClick={() => deleteCategory(categories.id)}
										/>
									)}
								</Box>
							</Box>
						))
					)}
				</Box>
			</Box>
		</Layout>
	)
}
