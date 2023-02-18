import { FC } from 'react'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Avatar,
	Heading,
	List,
	ListItem,
	ListIcon
} from '@chakra-ui/react'
import { MdModeEdit } from 'react-icons/md'
import { IoExitSharp } from 'react-icons/io5'
import { useSelector } from '@/hooks/use.selector'
import { useAuth } from '@/hooks/use.auth'
import { AiOutlineUser } from 'react-icons/ai'

export const Profile: FC = () => {
	const {user} = useAuth()
	
	return (
		<Popover>
			<PopoverTrigger>
				<Avatar size='sm' icon={<AiOutlineUser fontSize='1.5rem' />}/>
			</PopoverTrigger>
			<PopoverContent width={300} right={3} fontWeight='normal' border='none'>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>
					<Heading as='h4' size='sm'>
						{user.name}
					</Heading>
				</PopoverHeader>
				<PopoverBody>
					<List spacing={3}>
						<ListItem>
							<ListIcon as={MdModeEdit} size={16} />
							Edit profile
						</ListItem>
						<ListItem>
							<ListIcon as={IoExitSharp} size={16} />
							Log out
						</ListItem>
					</List>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
