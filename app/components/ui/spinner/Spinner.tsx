import { Spinner } from '@chakra-ui/react'
import { FC } from 'react'
import styles from './Spinner.module.scss'

export const SpinnerComponent: FC = () => {
	return (
		<div className={styles.spinner}>
			<Spinner size='xl' color='red' />
		</div>
	)
}
