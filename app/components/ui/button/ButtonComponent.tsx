import { Button } from '@chakra-ui/react'
import {FC} from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import {RxUpdate} from 'react-icons/rx'
import { MdOutlineAddCircle } from 'react-icons/md'
import { ButtonProps } from './Button.props'

export const ButtonComponent: FC<ButtonProps> = ({type, ...props}) => {
  switch(type) {
    case "Delete": 
    return <Button {...props} title="удалить" colorScheme="yellow"><AiTwotoneDelete/></Button>
    case "Update": 
    return <Button {...props}  title="редактировать" colorScheme="linkedin" size="sm" leftIcon={<RxUpdate/>}>Обновить</Button>
    case "Insert": 
    return <Button {...props}  title="добавить" colorScheme="whatsapp"><MdOutlineAddCircle/></Button>
    default:
      return <Button {...props}  title="добавить" colorScheme="whatsapp"><MdOutlineAddCircle/></Button>
  }
}
