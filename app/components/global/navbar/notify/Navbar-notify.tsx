import { Notify } from '@/components/ui/notify/Notify'
import { FC } from 'react'
import { BsEnvelopeFill } from 'react-icons/bs'
import { INavbarNotifyProps } from './Navbar-notify.props'
import styles from './Notify.module.scss'

export const NavbarNotify: FC<INavbarNotifyProps> = ({ message }) => {
	return (
		<div>
			{message.length && <div className={styles.notify}>{message.length}</div>}
			<Notify Icon={BsEnvelopeFill} message={message} />
		</div>
	)
}
