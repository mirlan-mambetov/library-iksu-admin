import { Login } from '@/pages'
import { useSelector } from '@/hooks/use.selector'
// import { Toastr } from '@/components'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPageAuth } from '@/types/auth-filelds.type'

const DashboardLogin: NextPageAuth = (props) => {
	const {errors, user} = useSelector(state => state.auth)
	const toastr = useToast()
	const {replace, pathname} = useRouter()
	useEffect(() => {
		if (errors) {
			toastr({
				description: `${errors}`,
        status: 'error',
        isClosable: true,
      })
		}
	}, [errors])

	return <Login {...props}/>
}
DashboardLogin.onlyGuest = true
export default DashboardLogin
