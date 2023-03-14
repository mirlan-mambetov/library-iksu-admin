import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { useContext } from 'react'

export const useModalComponent = () => useContext(ModalComponentInitialContext)
