import { createContext, useState } from 'react'

export const ModalComponentInitialContext = createContext({
	isOpen: false,
	updatedId: 0,
	updatedName: '',
	handlerOpen: (id: number | null, componentName: string) => {},
	handlerClose: () => {}
})

export const ModalComponentProvider = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [updatedId, setUpdatedId] = useState<number>(null)
	const [updatedName, setUpdatedName] = useState<string>("")

	const handlerOpen = (id: number, componentName: string) => {
		setIsOpen(true)
		setUpdatedId(id)
		setUpdatedName(componentName)
	}
	const handlerClose = () => {
		setUpdatedId(null)
		setUpdatedName("")
		setIsOpen(false)
	}

	return {
		isOpen,
		handlerClose,
		handlerOpen
	}
}
