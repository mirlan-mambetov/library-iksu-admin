import { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { chartPieStyles } from '../../../../../utils/chart'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const data = {
	labels: ['Сша', 'Казахстан', 'Кыргызстан', 'Греция', 'Италия', 'Россия'],
	datasets: [
		{
			label: 'Посещений',
			data: [12, 19, 3, 5, 2, 3],
			...chartPieStyles
		}
	]
}
const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const
		},
		title: {
			display: true,
			text: 'Индекс посещений сайта по странам'
		}
	}
}
export const PieChart: FC = () => {
	return <Pie data={data} options={options} />
}
