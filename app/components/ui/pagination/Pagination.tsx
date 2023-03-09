import { FC } from 'react'
import { IPaginateProps } from './Pagination.props'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import { GrPrevious, GrNext } from 'react-icons/gr'

export const Pagination: FC<IPaginateProps> = ({
	handler,
	initialPage,
	totalPage
}) => {
	return (
		<ReactPaginate
			initialPage={initialPage}
			breakLabel='...'
			onPageChange={handler}
			pageRangeDisplayed={5}
			pageCount={totalPage}
			marginPagesDisplayed={2}
			nextLabel={'След.'}
			previousLabel={'Пред.'}
			activeClassName={styles.active}
			containerClassName={styles.pagination}
			breakLinkClassName={styles.pageLink}
			pageClassName={styles.pageIitem}
			pageLinkClassName={styles.pageLink}
			previousClassName={styles.pageIitem}
			previousLinkClassName={styles.pageLink}
			nextClassName={styles.pageIitem}
			nextLinkClassName={styles.pageLink}
		/>
	)
}
