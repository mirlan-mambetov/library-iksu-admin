import { tabsApi } from '@/../api/tabs/Tabs-api'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
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
import { FC, useContext } from 'react'

export const AddTab: FC<{ id: number }> = ({ id }) => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const [createTab, { isLoading }] = tabsApi.useCreateTabMutation()
	const toastr = useToast()
	const submitHandler = async (values, actions) => {
		try {
			await createTab({ id, ...values })
				.unwrap()
				.then(() => handlerClose())
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
		<>
			<Formik
				initialValues={{ title: '', description: '' }}
				validate={values => {
					const errors = {} as { name: string }
					if (!values.title) {
						errors.name = 'Название обязательна'
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
					isSubmitting,
					setFieldValue
				}) => (
					<Form>
						<Stack
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								alignItems: 'center',
								pb: '30px'
							}}
						>
							<InputGroup>
								<FormControl isInvalid={errors.title && touched.title}>
									<FormLabel {...labeleStyle}>Название</FormLabel>
									<Input
										sx={inputStyles}
										name='title'
										onChange={handleChange}
										value={values.title}
									/>
									<FormErrorMessage>{errors.title}</FormErrorMessage>
								</FormControl>
							</InputGroup>
							<InputGroup>
								<FormControl>
									<FormLabel {...labeleStyle}>
										Описание (необязателен)
									</FormLabel>
									<Input
										sx={inputStyles}
										name='description'
										onChange={handleChange}
										value={values.description}
									/>
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
								{!isSubmitting
									? 'Отправить запрос на обновление'
									: 'Занимаюсь..'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	)
}
