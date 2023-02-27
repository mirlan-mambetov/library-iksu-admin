import { IMenuLink } from '@/interfaces/Menu-link.interface'
import { AiFillFolder, AiOutlineDashboard } from 'react-icons/ai'
// import { GiEarthAfricaEurope } from 'react-icons/gi'
// import { AiOutlineBarChart } from 'react-icons/ai'
import { FaQuestionCircle } from 'react-icons/fa'

export const menuData = {
	dashboard: [
		{
			link: '/dashboard',
			name: 'Dashboard',
			icon: AiOutlineDashboard
		},
		// {
		// 	link: '/chart/line',
		// 	name: 'Chart Line',
		// 	icon: AiOutlineBarChart
		// },
		// {
		// 	link: '/chart/map',
		// 	name: 'Chart Map',
		// 	icon: GiEarthAfricaEurope
		// },
		{
			link: '/faq',
			name: 'Раздел Faq',
			icon: FaQuestionCircle,
			isBlock: true
		}
	] as IMenuLink[],
	website: [
		{
			link: '/website',
			name: 'Главная страница',
			icon: AiFillFolder
		},
		{
			link: '/website/about',
			name: 'О библиотеке',
			icon: AiFillFolder
		},
		// {
		// 	link: '/website/contacts',
		// 	name: 'Contacts',
		// 	icon: MdContactSupport
		// }
	] as IMenuLink[]
}
