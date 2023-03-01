import { IMenuLink } from '@/interfaces/Menu-link.interface'
import {
	AiFillHome,
	AiFillQuestionCircle,
	AiOutlineDashboard,
	AiOutlineOrderedList
} from 'react-icons/ai'
// import { GiEarthAfricaEurope } from 'react-icons/gi'
// import { AiOutlineBarChart } from 'react-icons/ai'
import { FaQuestionCircle } from 'react-icons/fa'
import { IoNewspaper, IoNewspaperOutline } from 'react-icons/io5'
import { MdMiscellaneousServices } from 'react-icons/md'
import { RiFilePaper2Fill } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'

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
			icon: FaQuestionCircle
		}
	] as IMenuLink[],
	website: [
		{
			link: '/website',
			name: 'Главная страница',
			icon: AiFillHome
		},
		{
			link: '/website/about',
			name: 'О библиотеке',
			icon: AiFillQuestionCircle
		},
		{
			link: '/website/services',
			name: 'Сервисы',
			icon: MdMiscellaneousServices
		},
		{
			link: '/website/vestnik',
			name: 'Вестник',
			icon: IoNewspaper
		},
		{
			link: '/website/teachers',
			name: 'Труды',
			icon: RiFilePaper2Fill
		},
		{
			link: '/website/elibrary',
			name: 'Электронная библиотека',
			icon: ImBooks
		},
		{
			link: '/website/news',
			name: 'Новости',
			icon: IoNewspaperOutline
		},
		{
			link: '/website/window',
			name: 'Единое окно',
			icon: BsLayoutTextWindowReverse
		},
		{
			link: '/website/rules',
			name: 'Правила пользования',
			icon: AiOutlineOrderedList
		}
		// {
		// 	link: '/website/contacts',
		// 	name: 'Contacts',
		// 	icon: MdContactSupport
		// }
	] as IMenuLink[]
}
