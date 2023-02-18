import Link from 'next/link'
import { FC } from 'react'
import { IMenuProps } from './Menu.props'
import styles from './Menu.module.scss'

export const Menu: FC<IMenuProps> = ({ items }) => {
	return (
		<ul className={styles.menu}>
			{items.map(item => (
				<li key={item.link} className={styles.item}>
					<Link href={item.isBlock ? '#' : item.link} className={styles.link}>
						{item.icon && <item.icon />}
						<span>{item.name}</span>
					</Link>
				</li>
			))}
		</ul>
	)
}
