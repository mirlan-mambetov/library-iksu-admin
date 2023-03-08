import { tabloApi } from '@/../api/about/tablo/Tablo-api'
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

export const UpdateTablo: FC<{ id: number }> = ({ id }) => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const toastr = useToast()
	const [updateTablo, { isLoading }] = tabloApi.useUpdateTabloMutation()
	const submitHandler = async (values, action) => {
		try {
			await updateTablo({ id, data: values })
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
		<Formik
			initialValues={{ ceils: '', description: '' }}
			validate={values => {
				const errors = {} as { ceils: string; description: string }
				if (!values.ceils) {
					errors.ceils = 'Введите счет'
				} else if (!values.description) {
					errors.description = 'Введите описание'
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
							<FormControl isInvalid={errors.ceils && touched.ceils}>
								<FormLabel {...labeleStyle}>Счет</FormLabel>
								<Input
									type='number'
									sx={inputStyles}
									name='ceils'
									onChange={handleChange}
									value={values.ceils}
								/>
								<FormErrorMessage>{errors.ceils}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<InputGroup>
							<FormControl
								isInvalid={errors.description && touched.description}
							>
								<FormLabel {...labeleStyle}>Описание</FormLabel>
								<Input
									type='text'
									sx={inputStyles}
									name='description'
									onChange={handleChange}
									value={values.description}
								/>
								<FormErrorMessage>{errors.description}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<Button
							isDisabled={!isValid || isSubmitting || isLoading}
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
							Отправить запрос на обновление
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
