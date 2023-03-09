import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { CreatePartner } from './partners/Create-partner'
import { AddTab } from './tabs/Add-tab'
import { AddTabLink } from './tabs/Add-tab-link'
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
	}
}
