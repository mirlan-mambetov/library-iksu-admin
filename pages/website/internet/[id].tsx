import { internetLinkApi } from '@/../api/internet-links/Internet-link.service'
import { ButtonComponent } from '@/components'
import { useModalComponent } from '@/hooks/use.modal'
import { Layout } from '@/layout/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from '../../../app/pages/website/internet/internet.module.scss'

const InternetView = () => {
	const { handlerOpen } = useModalComponent()
	const { query } = useRouter()
	if (!query.id) return null
	const { data } = internetLinkApi.useFetchCategoriesByMainCategoryQuery(
		+query.id
	)
	const [deleteCategory] = internetLinkApi.useDeleteLinkCategoryMutation()

	return (
		<Layout title='Ссылки интернет'>
			<div className={style.wrap}>
				<div className={style.top}>
					<ButtonComponent
						size={'xs'}
						btnType='Insert'
						onClick={() => handlerOpen(+query.id, 'CREATEINTERNETLINK', 'ADD')}
					/>
				</div>
				{data ? (
					<div className={style.boxes}>
						{data.map(item => (
							<div className={style.box} key={item.id}>
								<Link target={'_blank'} href={`${item.link}`}>
									<span className={style.name}>{item.name}</span>
								</Link>
								<p>{item.description}</p>
								<div className={style.actions}>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(
												item.id,
												'UPDATEINTERNETLINKCATEOGRY',
												'UPDATE'
											)
										}
									/>
									<ButtonComponent
										btnType='Delete'
										size='xs'
										onClick={() => deleteCategory(item.id)}
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
export default InternetView
