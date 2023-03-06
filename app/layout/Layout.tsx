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
			<ModalComponent />
			<div className={styles.content}>
				<Dialog />
				{/* Navbar */}
				<Navbar />
				{/* Sidebar */}
				<Sidebar />
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	)
}
