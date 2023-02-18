import { FC, useState, useRef } from 'react'
import styles from './Sidebar.module.scss'
import { Text } from '@chakra-ui/react'
import { Menu } from '@/components/ui/menu/Menu'
import { menuData } from '@/components/ui/menu/data/menu.data'

export const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.body}>
				<div className={styles.menu}>
					<div className={styles.item}>
						<Menu items={menuData.dashboard} />
					</div>
					<div className={styles.item}>
						<Text fontSize='sm' sx={{ my: '10px' }}>
							Страницы сайта
						</Text>
						<Menu items={menuData.website} />
					</div>
				</div>
			</div>
			<div className={styles.end}>
				<Text fontSize={"xx-small"} as={"p"}>
					Developed and maintained by the Falcon group
				</Text>
			</div>
		</div>
	)
}
