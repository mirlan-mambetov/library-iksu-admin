import { internetLinkApi } from '@/../api/internet-links/Internet-link.service'
import { ButtonComponent } from '@/components'
import { useModalComponent } from '@/hooks/use.modal'
import { Layout } from '@/layout/Layout'
import Link from 'next/link'
import style from './internet.module.scss'

export const InternetLinksPage = () => {
	const { handlerOpen } = useModalComponent()
	const { data } = internetLinkApi.useFetchMainLinkCategoriesQuery(null)
	const [deleteCategory] = internetLinkApi.useDeleteLinkMainCategoryMutation()

	return (
		<Layout title='Ссылки интернет'>
			<div className={style.wrap}>
				<div className={style.top}>
					<h5 className={style.title}>Категории</h5>
					<ButtonComponent
						size={'xs'}
						btnType='Insert'
						onClick={() =>
							handlerOpen(null, 'CREATEINTERNETMAINCATEGORY', 'ADD')
						}
					/>
				</div>
				{data ? (
					<div className={style.boxes}>
						{data.map(item => (
							<div className={style.box} key={item.id}>
								<Link href={`/website/internet/${item.id}`}>
									<span className={style.name}>{item.name}</span>
								</Link>
								<div className={style.info}>
									<span>
										всего файлов(подкатегорий): {item.categories.length}
									</span>
								</div>
								<div className={style.actions}>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(
												item.id,
												'UPDATEMAINCATEGORYINTERNET',
												'UPDATE'
											)
										}
									/>
									<ButtonComponent
										onClick={() => deleteCategory(item.id)}
										btnType='Delete'
										size='xs'
										isDisabled={item.categories.length ? true : false}
									/>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</Layout>
	)
}
