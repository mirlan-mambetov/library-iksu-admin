import { newsApi } from '@/../api/news/news-api'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { useModalComponent } from '@/hooks/use.modal'
import { INews } from '@/interfaces/News-interface'
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
import { FC, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const NewsCreate: FC = () => {
	const { handlerClose } = useModalComponent()
	const toastr = useToast()
	const [file, setFile] = useState(null)
	const [createNews, { isLoading }] = newsApi.useCreateNewsMutation()

	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('title', values.title)
			formData.append('description', values.description)
			formData.append('file', values.image)
			await createNews(formData)
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
			initialValues={{ title: '', image: '', description: '' }}
			validate={values => {
				const errors = {} as INews
				if (!values.title) {
					errors.title = 'Заголовок обязателен'
				} else if (!values.description) {
					errors.description = 'Подзаголовок обязателен'
				} else if (!values.image) {
					errors.image = 'Выберите изображение'
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
									{file ? file.name : 'выберите изображение'}
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
										setFile(e.currentTarget.files[0])
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
							Отправить запрос на создание
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
