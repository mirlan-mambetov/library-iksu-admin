import { FC, PropsWithChildren } from 'react'
import { ILayoutProps } from './Layout.props'
import { Dialog, Meta, ModalComponent, Navbar, Sidebar } from '@/components'
import styles from './Layout.module.scss'

export const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
	children,
	isIndex = false,
	description,
	title,
	metaChild
}) => {
	return (
		<div className={styles.layout}>
			<Meta
				description={description}
				title={title}
				indexes={isIndex}
				children={metaChild}
			/>
			<div className={styles.content}>
				<ModalComponent />
				<Dialog />
				{/* Navbar */}
				<Navbar />
				{/* Sidebar */}
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	)
}
