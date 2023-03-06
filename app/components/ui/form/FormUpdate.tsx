import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { UpdateAboutInfo } from './about/info/Update-about-info'
import { UpdateArrivalImage } from './arrival/update-arrival-image'
import { UpdateHero } from './hero/Update-hero'
import { PartnersUpdate } from './partners/Partners-update'
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
		case 'UPDATEARRIVALIMAGE':
			return <UpdateArrivalImage id={updatedId} />
		case 'UPDATEPARTNERS':
			return <PartnersUpdate id={updatedId} />
		case 'UPDATEABOUTINFO':
			return <UpdateAboutInfo id={updatedId} />
	}
}
