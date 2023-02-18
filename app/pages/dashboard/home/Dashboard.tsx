import { LineChart, PieChart } from '@/components'
import { Layout } from '@/layout/Layout'
import { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

// import styles from './Dashboard.module.scss'

export const Dashboard: FC = () => {
	return (
		<Layout title='Welcome to Dashboard '>
			<Grid templateColumns='repeat(2, 1fr)' gap={2}>
				<GridItem>
					<PieChart />
				</GridItem>
				<GridItem>
					<LineChart />
				</GridItem>
			</Grid>
		</Layout>
	)
}
