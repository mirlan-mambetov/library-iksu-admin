import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { ElibraryCreateBook } from './elibrary/Elibrary-create-book'
import { ElibraryCreateMainCategory } from './elibrary/Elibrary-create-main-category'
import { ElibraryScategoryCreate } from './elibrary/Elibrary-scategory-create'
import { CreateInternetLinkCategory } from './internet-links/CreateInternetLinkCategory'
import { CreateLinkMainCategory } from './internet-links/CreateMainCategory'
import { NewsCreate } from './news/News-create'
import { CreatePartner } from './partners/Create-partner'
import { AddTab } from './tabs/Add-tab'
import { AddTabLink } from './tabs/Add-tab-link'
import { TeachersCategoryCreate } from './teachers/Teachers-category-create'
import { TeachersWorkCreate } from './teachers/Teachers-work-create'
import { CreateUser } from './users/Create-user'
import { CreateVestnikArchiv } from './vestnik/Create-vestnik-archiv'
import { CreateVestnikMaterial } from './vestnik/Create-vestnik-material'

export const FormAdd: FC = () => {
	const { updatedId, updatedName } = useContext(ModalComponentInitialContext)

	switch (updatedName) {
		case 'CREATETAB':
			return <AddTab id={updatedId} />
		case 'CREATETABLINK':
			return <AddTabLink id={updatedId} />
		case 'CREATEPARTNER':
			return <CreatePartner />
		case 'CREATEVESTNIKARCHIV':
			return <CreateVestnikArchiv id={updatedId} />
		case 'CREATEVESTNIKMATERIAL':
			return <CreateVestnikMaterial id={updatedId} />
		case 'CREATEELIBRARYMAINCATEGORY':
			return <ElibraryCreateMainCategory />
		case 'CREATEELIBRARYSCATEGORY':
			return <ElibraryScategoryCreate id={updatedId} />
		case 'CREATEELIBRARYBOOK':
			return <ElibraryCreateBook id={updatedId} />
		case 'CREATEUSER':
			return <CreateUser />
		case 'CREATETEACHERSCATEGORY':
			return <TeachersCategoryCreate />
		case 'CREATETEACHERSWORK':
			return <TeachersWorkCreate id={updatedId} />
		case 'NEWSCREATE':
			return <NewsCreate />
		case 'CREATEINTERNETMAINCATEGORY':
			return <CreateLinkMainCategory />
		case 'CREATEINTERNETLINK':
			return <CreateInternetLinkCategory />
	}
}
