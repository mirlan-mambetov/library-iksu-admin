import { Login } from '@/pages'
import { useSelector } from '@/hooks/use.selector'
// import { Toastr } from '@/components'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { NextPage } from 'next'

const DashboardLogin: NextPage = props => {
	const { errors, user } = useSelector(state => state.auth)
	const toastr = useToast()
	useEffect(() => {
		if (errors) {
			toastr({
				description: `${errors}`,
				status: 'error',
				isClosable: true
			})
		}
	}, [errors, toastr])

	return <Login {...props} />
}
export default DashboardLogin
