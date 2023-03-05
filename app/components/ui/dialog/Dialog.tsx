import { DialogContext } from '@/contexts/Dialog-context'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button
} from '@chakra-ui/react'
import { FC, useContext, useRef } from 'react'

export const Dialog: FC = () => {
	const { isOpen, onClose, onConfirm } = useContext(DialogContext)
	const focusRef = useRef()
	return (
		<>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={focusRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Удаление
						</AlertDialogHeader>

						<AlertDialogBody>Вы уверены, что хотите удалить?</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={focusRef} onClick={onClose} size='sm'>
								Нет
							</Button>
							<Button colorScheme='red' onClick={onConfirm} ml={3} size='sm'>
								Да, удалить
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}
