import { elibraryApi } from '@/../api/elibrary/elibrary-api'
import { pageApi } from '@/../api/pages/page-api'
import { Hero, SpinnerComponent } from '@/components'
import { PagesConstance } from '@/constance/Pages-constance'
import { Layout } from '@/layout/Layout'
import { Box, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

export const Elibrary: FC = () => {
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
				<Box sx={{ display: 'flex', justifyContent: 'space-around' }} mt={5}>
					{loadingCategories ? (
						<span>Загрузка категорий..</span>
					) : (
						eCategories.map(categories => (
							<Link href={`/website/elibrary/${categories.id}`}>
								<Box key={categories.id}>
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
						))
					)}
				</Box>
			</Box>
		</Layout>
	)
}
