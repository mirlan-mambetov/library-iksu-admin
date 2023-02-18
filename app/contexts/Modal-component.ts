import { createContext, useState } from 'react'

export const ModalComponentInitialContext = createContext({
	isOpen: false,
	handlerOpen: () => {},
	handlerClose: () => {}
})

export const ModalComponentProvider = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handlerOpen = () => setIsOpen(true)
	const handlerClose = () => setIsOpen(false)

	return {
		isOpen,
		handlerClose,
		handlerOpen
	}
}
