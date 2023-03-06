import { createContext, useState } from 'react'

interface IInitialContext {
	isOpen: boolean
	updatedId: number
	updatedName: string
	formType: string
}
interface IInitialFunctionContext {
	handlerOpen: (
		updatedId: number,
		updatedName: string,
		formType: string
	) => void
	handlerClose: () => void
}
const initialContext: IInitialContext & IInitialFunctionContext = {
	isOpen: false,
	updatedId: 0,
	updatedName: '',
	formType: '',
	handlerOpen: () => {},
	handlerClose: () => {}
}

export const ModalComponentInitialContext = createContext({ ...initialContext })

export const ModalComponentProvider = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [updatedId, setUpdatedId] = useState<number>(null)
	const [updatedName, setUpdatedName] = useState<string>('')
	const [formType, setFormType] = useState('')

	const handlerOpen = (id: number, updatedName: string, type: string) => {
		setIsOpen(true)
		setUpdatedId(id)
		setUpdatedName(updatedName)
		setFormType(type)
	}
	const handlerClose = () => {
		setUpdatedId(null)
		setUpdatedName('')
		setFormType('')
		setIsOpen(false)
	}

	return {
		isOpen,
		updatedId,
		updatedName,
		formType,
		handlerClose,
		handlerOpen
	}
}
