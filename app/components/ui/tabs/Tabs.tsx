import { FC, useContext } from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionPanel,
	Box,
	AccordionButton,
	Text
} from '@chakra-ui/react'
import { ButtonComponent } from '../button/ButtonComponent'
import { ITabsProps } from './Tabs.props'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { formatDate } from '@/utils/Format-date'
import { TabsLink } from './Tabs-link'
import { tabsApi } from '@/../api/tabs/Tabs-api'

export const Tabs: FC<ITabsProps> = ({ tabs }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const [deleteTab] = tabsApi.useDeleteTabMutation()

	return (
		<Accordion allowToggle>
			{tabs ? (
				tabs.map(tab => (
					<AccordionItem key={tab.id}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
							<AccordionButton sx={{ position: 'relative' }}>
								<Box
									sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}
								>
									<Text>{tab.title}</Text>
								</Box>
								<AccordionIcon sx={{ right: 0, position: 'absolute' }} />
								<Text
									fontSize='xx-small'
									sx={{ position: 'absolute', right: '20' }}
								>
									последний раз был изменен в: {''}
									{formatDate(tab.createdAt, 'YYYY-MM-DD - HH:mm:ss')}
								</Text>
							</AccordionButton>
							<Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
								<ButtonComponent
									onClick={() => handlerOpen(tab.id, 'UPDATETAB', 'UPDATE')}
									size='sm'
									btnType='Update'
								/>
								<ButtonComponent
									size='sm'
									btnType='Delete'
									onClick={() => deleteTab(tab.id)}
								/>
								{tab.isLink && (
									<ButtonComponent
										onClick={() => handlerOpen(tab.id, 'CREATETABLINK', 'ADD')}
										size='sm'
										btnType='Insert'
									/>
								)}
							</Box>
						</Box>
						{tab.description ? (
							<AccordionPanel>{tab.description}</AccordionPanel>
						) : (
							<AccordionPanel>
								<TabsLink data={tab.isLink} />
							</AccordionPanel>
						)}
					</AccordionItem>
				))
			) : (
				<span>Данных нет в табах..</span>
			)}
		</Accordion>
	)
}
