import { ButtonProps } from '@chakra-ui/react'

export interface IButtonProps extends ButtonProps {
	btnType: 'Delete' | 'Update' | 'Insert'
}
