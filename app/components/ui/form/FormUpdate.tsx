import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { UpdateHero } from './hero/Update-hero'
import { UpdateTabs } from './tabs/Update-tabs'
import { UpdateTabsLink } from './tabs/Update-tabs-link'

export const FormUpdate: FC = () => {
	const { updatedId, updatedName } = useContext(ModalComponentInitialContext)

	switch (updatedName) {
		case 'UPDATEHERO':
			return <UpdateHero id={updatedId} />
		case 'UPDATETAB':
			return <UpdateTabs id={updatedId} />
		case 'UPDATETABLINK':
			return <UpdateTabsLink id={updatedId} />
	}
}
