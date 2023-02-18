import { FC } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const
		},
		title: {
			display: true,
			text: 'Индекс посещений сайта'
		}
	}
}

// Data from Database
const labels = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
]
export const data = {
	labels,
	datasets: [
		{
			fill: true,
			label: 'Посещение сайта',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.5)'
		}
	]
}

export const LineChart: FC = () => {
	return <Line options={options} data={data} />
}
