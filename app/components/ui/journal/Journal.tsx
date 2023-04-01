import { useModalComponent } from '@/hooks/use.modal'
import { Box, Image, List, ListItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { ButtonComponent } from '../button/ButtonComponent'
import { IJournalProps } from './Journal-props'

export const Journal: FC<IJournalProps> = ({ data }) => {
	const { handlerOpen } = useModalComponent()
	return (
		<Box>
			{data?.map(journal => (
				<Box key={journal.id}>
					{journal.journalHead &&
						journal.journalHead.map(head => (
							<Box
								key={head.id}
								my={5}
								sx={{ border: '1px solid #e4e4e4', padding: '10px' }}
							>
								<Box
									sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
								>
									<Text fontSize='lg'>{head.title}</Text>
									<ButtonComponent
										btnType='Update'
										size='xs'
										onClick={() =>
											handlerOpen(head.id, 'UPDATEJOURNALHEAD', 'UPDATE')
										}
									/>
								</Box>
								<List my={4}>
									{head.items.map(item => (
										<ListItem
											key={item.id}
											sx={{ display: 'flex', gap: '12px', my: '12px' }}
										>
											{item.title} <span>{item.description}</span>
											<ButtonComponent
												btnType='Update'
												size='xs'
												onClick={() =>
													handlerOpen(item.id, 'UPDATEJOURNALITEMS', 'UPDATE')
												}
											/>
										</ListItem>
									))}
								</List>
							</Box>
						))}

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
						mt={4}
					>
						<Box
							mt={4}
							sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
						>
							<Text fontSize='2xl'>{journal.title}</Text>
							<Text fontSize='md'>{journal.subtitle}</Text>
							<Text maxW={600}>{journal.description}</Text>
							<Box mt={3}>
								<ButtonComponent
									btnType='Update'
									size='xs'
									onClick={() =>
										handlerOpen(journal.id, 'UPDATEJOURNAL', 'UPDATE')
									}
								/>
							</Box>
						</Box>

						<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
							<Image
								w={330}
								src={`${process.env.NEXT_PUBLIC_APP_STATIC_FILES}${journal.image}`}
							/>
							<Box mt={3}>
								<ButtonComponent btnType='Update' size='xs' isDisabled />
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	)
}
