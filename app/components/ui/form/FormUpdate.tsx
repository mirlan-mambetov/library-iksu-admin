import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FC, useContext } from 'react'
import { UpdateAboutInfo } from './about/info/Update-about-info'
import { UpdateOwner } from './about/owner/Update-owner'
import { UpdateTablo } from './about/tablo/Update-tablo'
import { UpdateArrivalImage } from './arrival/update-arrival-image'
import { ElibraryScategoryUpdate } from './elibrary/Elibrary-scategory-update'
import { ElibraryUpdateMainCategory } from './elibrary/Elibrary-update-main-category'
import { UpdateHero } from './hero/Update-hero'
import { PartnersUpdate } from './partners/Partners-update'
import { UpdateService } from './services-page/Update-services'
import { UpdateTabs } from './tabs/Update-tabs'
import { UpdateTabsLink } from './tabs/Update-tabs-link'
import { UpdateVestnikArchiv } from './vestnik/Update-vestnik-archiv'
import { UpdateVestnikMaterial } from './vestnik/Update-vestnik-material'

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
		case 'UPDATEOWNER':
			return <UpdateOwner id={updatedId} />
		case 'UPDATETABLO':
			return <UpdateTablo id={updatedId} />
		case 'UPDATESERVICES':
			return <UpdateService id={updatedId} />
		case 'UPDATEVESTNIKARCHIV':
			return <UpdateVestnikArchiv id={updatedId} />
		case 'UPDATEVESTNIKMATERIAL':
			return <UpdateVestnikMaterial id={updatedId} />
		case 'UPDATEELIBRARYMAINCATEGORY':
			return <ElibraryUpdateMainCategory id={updatedId} />
		case 'UPDATEELIBRARYSCATEGORY':
			return <ElibraryScategoryUpdate id={updatedId} />
	}
}
