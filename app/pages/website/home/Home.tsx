import { Layout } from '@/layout/Layout'
import styles from './Home.module.scss'

export const Home = () => {
	return (
		<Layout title='Website home page'>
			<div className={styles.homeSection}>website home page</div>
		</Layout>
	)
}
