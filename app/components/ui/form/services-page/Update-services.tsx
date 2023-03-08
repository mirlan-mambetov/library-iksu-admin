import { servicePageApi } from '@/../api/service-page/Service-page-api'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { IServices } from '@/interfaces/Services-interface'
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Textarea,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const UpdateService: FC<{ id: number }> = ({ id }) => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const [image, setImage] = useState(null)
	const toastr = useToast()
	const [updateService] = servicePageApi.useUpdateServicesMutation()

	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('title', values.title)
			formData.append('subtitle', values.subtitle)
			formData.append('description', values.description)
			formData.append('file', values.image)
			await updateService({ id, data: formData })
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
			initialValues={{ title: '', subtitle: '', description: '', image: '' }}
			validate={values => {
				const errors = {} as IServices
				if (!values.title) {
					errors.title = 'Заголовок обязателен'
				} else if (!values.subtitle) {
					errors.subtitle = 'Подзаголовок обязателен'
				} else if (!values.description) {
					errors.description = 'Описание обязательна'
				} else if (!values.image) {
					errors.image = 'Выберите изображание'
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
						<InputGroup>
							<FormControl
								isInvalid={errors.image && touched.image}
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
									{image ? image.name : 'выберите файл'}
								</FormLabel>
								<InputLeftElement
									pointerEvents='none'
									children={<AiOutlineCloudUpload />}
								/>
								<Input
									type='file'
									name='image'
									accept='image/**'
									onChange={e => {
										setFieldValue('image', e.currentTarget.files[0])
										setImage(e.currentTarget.files[0])
									}}
									hidden
									id='upload'
								/>
								<FormErrorMessage pl={4} pt={3}>
									{errors.image}
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
							Отправить запрос на обновление
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
