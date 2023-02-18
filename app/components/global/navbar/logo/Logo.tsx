import { FC } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { useAuth } from '@/hooks/use.auth'

export const Logo: FC = () => {
	const { colorMode } = useColorMode()
	const {user} = useAuth()

	return (
		// Paste you'r svg code | paths... & Text..
		<h1>Привет, {user.name}.</h1>
	)
}
