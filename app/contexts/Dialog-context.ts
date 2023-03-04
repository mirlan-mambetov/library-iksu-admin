import { createContext, useState } from 'react'

interface IDialogContext {
	isOpen: boolean
	confirm: boolean
	deletedId: number
	onOpen: (id: number) => void
	onClose: () => void
	onConfirm: () => void
}
const initialContext: IDialogContext = {
	isOpen: false,
	confirm: false,
	deletedId: 0,
	onClose: () => {},
	onOpen: id => {},
	onConfirm: () => {}
}
export const DialogContext = createContext({ ...initialContext })

export const DialogProvider = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const [deletedId, setDeletedId] = useState(null)

	const onOpen = (id: number) => {
		setIsOpen(true)
		setDeletedId(id)
	}
	const onConfirm = () => {
		setConfirm(true)
	}

	const onClose = () => {
		setIsOpen(false)
		setConfirm(false)
		setDeletedId(null)
	}

	return {
		isOpen,
		confirm,
		deletedId,
		onConfirm,
		onClose,
		onOpen
	}
}
