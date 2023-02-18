import { FC } from 'react'
import { NotifyProps } from './Notify.props'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Button
} from '@chakra-ui/react'

export const Notify: FC<NotifyProps> = ({ message, Icon }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Button sx={{ p: 0, m: 0, height: 0, minWidth: 0 }}>{<Icon />}</Button>
			</PopoverTrigger>
			<PopoverContent width={300} right={3} border='none'>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>Notifications</PopoverHeader>
				<PopoverBody>
					{message.map((m, i) => (
						<div key={i} style={{ marginBottom: '10px' }}>
							<span>{m}</span>
							<br />
						</div>
					))}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
