import { FC, useState } from 'react'
import styles from './Login.module.scss'
import {Form, Formik} from 'formik'
import {
	Stack,
	InputGroup,
	Input,
	FormLabel,
	InputRightElement,
	Button,
	FormErrorMessage,
	FormControl,
} from '@chakra-ui/react'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { IoEnterOutline } from 'react-icons/io5'
import { inputStyles } from '@/../utils/styles'
import Head from 'next/head'
import { logInValidate } from '@/../utils/form.validate'
import { useActions } from '@/hooks/use.actions'

export const Login: FC = () => {
	const {login} = useActions()
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)
	
	const submitHandler =  (values: {email: string, password: string}, actions) => {
		login({...values})
	}

	return (
		<>
			<Head>
				<title itemProp='headline'>Выполните вход</title>
			</Head>
			<div className={styles.login}>
				<div className={styles.content} >
					<Formik  
						initialValues={{email: '', password: ''}}
						validate={values => logInValidate(values)}
						onSubmit={(values, actions) => submitHandler(values, actions)}
						>
						{({errors, touched, values, handleChange, handleSubmit, isValid}) => (
							<Form onSubmit={handleSubmit}>
							<Stack spacing={6}  color='blackAlpha.700'>
								<InputGroup flexDirection='column'>
									<FormControl isInvalid={errors.email && touched.email}>
										<FormLabel>E-mail</FormLabel>
										<Input sx={inputStyles} name="email" onChange={handleChange} value={values.email}/>
										<FormErrorMessage>{errors.email}</FormErrorMessage>
									</FormControl>
								</InputGroup>
								<InputGroup flexDirection='column' position='relative'>
									<FormControl isInvalid={errors.password && touched.email}>
										<FormLabel>Пароль</FormLabel>
										<Input onChange={handleChange} value={values.password} type={show ? 'text' : 'password'} name="password" sx={inputStyles} />
										<FormErrorMessage>{errors.password}</FormErrorMessage>
										<InputRightElement
											sx={{ position: 'absolute', top: '33px', right: '10px' }}
										>
											<Button h='1.75rem' size='sm' onClick={handleClick}>
												{show ? <BiHide /> : <BiShowAlt />}
											</Button>
										</InputRightElement>
									</FormControl>
								</InputGroup>
								<Button isDisabled={!isValid} type='submit' colorScheme='facebook' rightIcon={<IoEnterOutline />} color="whiteAlpha.900">
									Войти
								</Button>
							</Stack>
							</Form>
						)}
					</Formik>
				</div>
				<div className={styles.copyright}>
					<span>Developed and maintained by the Falcon group</span>
					<a target="_blank" rel='noreferer' href="https://www.instagram.com/falcon.groups/">follow us on instagram</a>
				</div>
			</div>
		</>
	)
}
