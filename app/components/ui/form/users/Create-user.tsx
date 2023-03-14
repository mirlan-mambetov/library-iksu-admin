import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC } from 'react'

export const CreateUser: FC = () => {
	const toastr = useToast()

	const submitHandler = async (values, actions) => {
		try {
			console.log(values)
		} catch (err) {
			if (errorsHandler(err)) {
				const errMsg =
					// @ts-ignore
					'error' in err ? err.error : JSON.stringify(err.data.message)
				toastr({
					title: `${errMsg}`,
					status: 'error',
					isClosable: true
				})
			} else if (isErrorWithMessage(err)) {
				toastr({
					title: `${err.message}`,
					status: 'error',
					isClosable: true
				})
			}
		}
	}

	return (
		<Formik
			initialValues={{ email: '', name: '', password: '' }}
			validate={values => {
				const errors = {} as { email: string; name: string; password: string }
				if (!values.email) {
					errors.email = 'E-mail обязателен'
				} else if (!values.name) {
					errors.name = 'Введите имя пользователя'
				} else if (!values.password) {
					errors.password = 'Пароль'
				}
				return errors
			}}
			onSubmit={(values, actions) => submitHandler(values, actions)}
		>
			{({
				errors,
				touched,
				values,
				handleChange,
				isValid,
				setFieldValue,
				isSubmitting
			}) => (
				<Form>
					<Stack
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '20px',
							alignItems: 'center',
							pb: '30px'
						}}
					>
						<InputGroup>
							<FormControl isInvalid={errors.email && touched.email}>
								<FormLabel {...labeleStyle}>E-mail</FormLabel>
								<Input
									sx={inputStyles}
									name='email'
									onChange={handleChange}
									value={values.email}
								/>
								<FormErrorMessage>{errors.email}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<InputGroup>
							<FormControl isInvalid={errors.name && touched.name}>
								<FormLabel {...labeleStyle}>Имя</FormLabel>
								<Input
									sx={inputStyles}
									name='name'
									onChange={handleChange}
									value={values.name}
								/>
								<FormErrorMessage>{errors.name}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<InputGroup>
							<FormControl isInvalid={errors.password && touched.password}>
								<FormLabel {...labeleStyle}>Пароль</FormLabel>
								<Input
									sx={inputStyles}
									name='password'
									onChange={handleChange}
									value={values.password}
								/>
								<FormErrorMessage>{errors.password}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<Button
							isDisabled={!isValid || isSubmitting}
							type='submit'
							colorScheme='whatsapp'
							color='whiteAlpha.900'
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								width: '100%',
								mt: '20px'
							}}
						>
							Отправить запрос на создание
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
