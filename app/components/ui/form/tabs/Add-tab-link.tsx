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
	InputLeftElement,
	Stack,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const AddTabLink: FC<{ id: number }> = ({ id }) => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const [file, setFile] = useState(null)
	const toastr = useToast()
	const [createTabLink, { isLoading }] = tabsApi.useCreateTabLinkByIdMutation()
	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('file', values.link)

			await createTabLink({ id, data: formData })
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
				initialValues={{ name: '', link: '' }}
				validate={values => {
					const errors = {} as { name: string; link: string }
					if (!values.name.length) {
						errors.name = 'Название обязательна'
					} else if (!values.link) {
						errors.link = 'Файл не выбран'
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
								<FormControl isInvalid={errors.name && touched.name}>
									<FormLabel {...labeleStyle}>Название</FormLabel>
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
								<FormControl
									isInvalid={errors.link && touched.link}
									sx={{
										border: '1px solid var(--chakra-colors-gray-300)',
										borderRadius: '4px',
										p: '4px 0px'
									}}
								>
									<FormLabel
										htmlFor='upload'
										sx={{ pl: '50px', pt: '5px', cursor: 'pointer' }}
										{...labeleStyle}
									>
										{file ? file.name : 'файл не выбран'}
									</FormLabel>
									<InputLeftElement
										pointerEvents='none'
										children={<AiOutlineCloudUpload />}
									/>
									<Input
										type='file'
										name='link'
										accept='file/**'
										onChange={e => {
											setFieldValue('link', e.currentTarget.files[0])
											setFile(e.currentTarget.files[0])
										}}
										hidden
										id='upload'
									/>
									<FormErrorMessage pl={4} pt={3}>
										{errors.link}
									</FormErrorMessage>
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
