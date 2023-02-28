import { FC, useContext } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody
} from '@chakra-ui/react'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { FormAdd } from '../form/FormAdd'
import { FormUpdate } from '../form/FormUpdate'

export const ModalComponent: FC = () => {
	const { handlerClose, isOpen, formType } = useContext(
		ModalComponentInitialContext
	)

	return (
		<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={handlerClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{formType === 'ADD' ? 'Добавить' : 'Обновить'}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{formType === 'ADD' ? <FormAdd /> : <FormUpdate />}
				</ModalBody>
				{/* <ModalFooter>
				
				</ModalFooter> */}
			</ModalContent>
		</Modal>
	)
}
