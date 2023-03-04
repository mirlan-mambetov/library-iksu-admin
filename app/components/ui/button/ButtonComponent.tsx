import { Button } from '@chakra-ui/react'
import { FC } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { RxUpdate } from 'react-icons/rx'
import { MdOutlineAddCircle } from 'react-icons/md'
import { IButtonProps } from './Button.props'

export const ButtonComponent: FC<IButtonProps> = ({ btnType, ...props }) => {
	switch (btnType) {
		case 'Delete':
			return (
				<Button {...props} title='удалить' colorScheme='yellow'>
					<AiTwotoneDelete />
				</Button>
			)
			break
		case 'Update':
			return (
				<Button
					{...props}
					title='редактировать'
					colorScheme='linkedin'
					leftIcon={<RxUpdate />}
				>
					Обновить
				</Button>
			)
			break
		case 'Insert':
			return (
				<Button {...props} title='добавить' colorScheme='whatsapp'>
					<MdOutlineAddCircle />
				</Button>
			)
			break
		default:
			return (
				<Button {...props} title='добавить' colorScheme='whatsapp'>
					<MdOutlineAddCircle />
				</Button>
			)
	}
}
