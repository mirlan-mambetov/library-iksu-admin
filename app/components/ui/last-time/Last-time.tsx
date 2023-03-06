import { formatDate } from '@/../utils/Format-date'
import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { ILastTimeProps } from './Last-time.props'

export const LastTime: FC<ILastTimeProps> = ({ data, ...props }) => {
	return (
		<Text {...props}>
			Последнее изменение: {formatDate(data, 'YYYY-MM-DD - HH:mm:ss')}{' '}
		</Text>
	)
}
