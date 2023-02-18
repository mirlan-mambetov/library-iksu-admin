import { FC, useContext } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Text,
	Button
} from '@chakra-ui/react'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'

export const ModalComponent: FC = () => {
	const { handlerClose, isOpen } = useContext(ModalComponentInitialContext)

	return (
		<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={handlerClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text fontWeight='bold' mb='1rem'>
						You can scroll the content behind the modal
					</Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
					autem sapiente! Quaerat commodi esse dolore consequuntur corrupti
					laboriosam quisquam beatae.
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={handlerClose}>
						Close
					</Button>
					<Button variant='ghost'>Secondary Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
