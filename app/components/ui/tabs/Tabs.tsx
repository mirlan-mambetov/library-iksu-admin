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
import { TabsLink } from './Tabs-link'
import { tabsApi } from '@/../api/tabs/Tabs-api'
import { LastTime } from '@/components'

export const Tabs: FC<ITabsProps> = ({ tabs, pageId, tabsTitle }) => {
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const [deleteTab] = tabsApi.useDeleteTabMutation()

	return (
		<>
			<Text mt='10' mb='4' fontSize='2xl'>
				{tabsTitle}
			</Text>
			<ButtonComponent
				btnType='Insert'
				size='sm'
				ml={2}
				mb={5}
				onClick={() => handlerOpen(pageId, 'CREATETAB', 'ADD')}
			/>
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
									<LastTime
										data={tab.updatedAt}
										position='absolute'
										right={20}
										fontSize='x-small'
									/>
								</AccordionButton>
								<Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
									<ButtonComponent
										onClick={() => handlerOpen(tab.id, 'UPDATETAB', 'UPDATE')}
										size='sm'
										btnType='Update'
									/>
									{!tab.description ? (
										<ButtonComponent
											onClick={() =>
												handlerOpen(tab.id, 'CREATETABLINK', 'ADD')
											}
											size='sm'
											btnType='Insert'
										/>
									) : null}
									{!tab.isLink.length && (
										<ButtonComponent
											size='sm'
											btnType='Delete'
											onClick={() => deleteTab(tab.id)}
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
		</>
	)
}
