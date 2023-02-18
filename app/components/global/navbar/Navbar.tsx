import { FC } from 'react'
import styles from './Navbar.module.scss'
import { CiDark, CiLight } from 'react-icons/ci'
import { Logo, NavbarNotify, Profile } from '@/components'
import { useColorMode } from '@chakra-ui/react'

export const Navbar: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const testDataMessage = ['Hello', 'Hello2']
	return (
		<div className={styles.navbar}>
			<div className={styles.logo}>
				<Logo />
			</div>
			<ul className={styles.action}>
				<li onClick={toggleColorMode} title='Change theme'>
					{colorMode === 'light' ? <CiDark size={20} /> : <CiLight size={20} />}
				</li>
				<li title='Notifications'>
					<NavbarNotify message={testDataMessage} />
				</li>
				<li title='Profile setting'>
					<Profile />
				</li>
			</ul>
		</div>
	)
}
