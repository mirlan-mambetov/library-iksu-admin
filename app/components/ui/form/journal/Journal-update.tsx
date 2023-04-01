import { journalApi } from '@/../api/journal/journal-api'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { useModalComponent } from '@/hooks/use.modal'
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	Textarea,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC } from 'react'

export const JournalUpdate: FC<{ id: number }> = ({ id }) => {
	const toastr = useToast()
	const { handlerClose } = useModalComponent()
	const [updateJournal, { isLoading }] = journalApi.useUpdateJournalMutation()

	const submitHandler = async (values, actions) => {
		try {
			await updateJournal({ id, body: values })
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
			initialValues={{ title: '', subtitle: '', description: '' }}
			validate={values => {
				const errors = {} as {
					title: string
					subtitle: string
					description: string
				}
				if (!values.title.length) {
					errors.title = 'Название обязательно'
				} else if (!values.subtitle) {
					errors.subtitle = 'Подзаголовок обязателен'
				} else if (!values.description) {
					errors.description = 'Описание обязательно'
				}
				return errors
			}}
			onSubmit={(values, actions) => submitHandler(values, actions)}
		>
			{({ errors, touched, values, handleChange, isValid, isSubmitting }) => (
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
								<FormLabel {...labeleStyle}>Заголовок</FormLabel>
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
							<FormControl isInvalid={errors.subtitle && touched.subtitle}>
								<FormLabel {...labeleStyle}>Подзаголовок</FormLabel>
								<Input
									sx={inputStyles}
									name='subtitle'
									onChange={handleChange}
									value={values.subtitle}
								/>
								<FormErrorMessage>{errors.subtitle}</FormErrorMessage>
							</FormControl>
						</InputGroup>

						<InputGroup>
							<FormControl
								isInvalid={errors.description && touched.description}
							>
								<FormLabel {...labeleStyle}>Описание</FormLabel>
								<Textarea
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
							{!isSubmitting ? 'Отправить запрос на обновление' : 'Занимаюсь..'}
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
