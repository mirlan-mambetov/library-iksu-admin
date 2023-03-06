import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { CreatePartner } from './partners/Create-partner'
import { AddTab } from './tabs/Add-tab'
import { AddTabLink } from './tabs/Add-tab-link'

export const FormAdd: FC = () => {
	const { updatedId, updatedName } = useContext(ModalComponentInitialContext)

	switch (updatedName) {
		case 'CREATETAB':
			return <AddTab id={updatedId} />
		case 'CREATETABLINK':
			return <AddTabLink id={updatedId} />
		case 'CREATEPARTNER':
			return <CreatePartner id={updatedId} />
	}
}
