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
	Textarea,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useContext } from 'react'

export const UpdateTabs: FC<{ id: number }> = ({ id }) => {
	const toastr = useToast()
	const { handlerClose } = useContext(ModalComponentInitialContext)

	const { data: Tab, isLoading } = tabsApi.useFetchTabByIdQuery(id, {
		skip: !id
	})
	const [updateTab, { isLoading: queryLoading }] =
		tabsApi.useUpdateTabByIdMutation()

	const submitHandler = async (values, action) => {
		try {
			await updateTab({ id, ...values })
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
			{isLoading ? (
				<span>загрузка данных</span>
			) : (
				<Formik
					initialValues={{ title: Tab.title, description: Tab.description }}
					validate={values => {
						const errors = {} as { title: string }
						if (!values.title) {
							errors.title = 'Заголовок обязателен'
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
								{Tab.description && (
									<InputGroup>
										<FormControl
											isInvalid={errors.description && touched.description}
										>
											<FormLabel {...labeleStyle}>описание</FormLabel>
											<Textarea
												name='description'
												onChange={handleChange}
												value={values.description}
											/>
											<FormErrorMessage>{errors.description}</FormErrorMessage>
										</FormControl>
									</InputGroup>
								)}
								<Button
									isDisabled={!isValid || isSubmitting || queryLoading}
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
			)}
		</>
	)
}
