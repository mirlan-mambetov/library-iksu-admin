import { elibraryApi } from '@/../api/elibrary/elibrary-api'
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

export const ElibraryCreateBook: FC<{ id: number }> = ({ id }) => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const toastr = useToast()
	const [file, setFile] = useState(null)
	const [createBook, { isLoading }] = elibraryApi.useCreateBookMutation()

	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('authors', values.authors)
			formData.append('description', values.description)
			formData.append('published', values.published)
			formData.append('name', values.name)
			formData.append('file', values.file)
			await createBook({ id, data: formData })
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
			initialValues={{
				authors: '',
				name: '',
				description: '',
				published: '',
				file: ''
			}}
			validate={values => {
				const errors = {} as { file: string }
				if (!values.file) {
					errors.file = 'Файл не выбран'
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
							<FormControl isInvalid={errors.authors && touched.authors}>
								<FormLabel {...labeleStyle}>Авторы</FormLabel>
								<Input
									sx={inputStyles}
									name='authors'
									onChange={handleChange}
									value={values.authors}
								/>
								<FormErrorMessage>{errors.authors}</FormErrorMessage>
							</FormControl>
						</InputGroup>

						<InputGroup>
							<FormControl
								isInvalid={errors.description && touched.description}
							>
								<FormLabel {...labeleStyle}>Описание</FormLabel>
								<Input
									sx={inputStyles}
									name='description'
									onChange={handleChange}
									value={values.description}
								/>
								<FormErrorMessage>{errors.description}</FormErrorMessage>
							</FormControl>
						</InputGroup>
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
							<FormControl isInvalid={errors.published && touched.published}>
								<FormLabel {...labeleStyle}>Дата публикации</FormLabel>
								<Input
									type='number'
									sx={inputStyles}
									name='published'
									onChange={handleChange}
									value={values.published}
								/>
								<FormErrorMessage>{errors.published}</FormErrorMessage>
							</FormControl>
						</InputGroup>

						<InputGroup>
							<FormControl
								isInvalid={errors.file && touched.file}
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
									{file ? file.name : 'выберите файл'}
								</FormLabel>
								<InputLeftElement
									pointerEvents='none'
									children={<AiOutlineCloudUpload />}
								/>
								<Input
									type='file'
									name='file'
									onChange={e => {
										setFieldValue('file', e.currentTarget.files[0])
										setFile(e.currentTarget.files[0])
									}}
									hidden
									id='upload'
								/>
								<FormErrorMessage pl={4} pt={3}>
									{errors.file}
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
							Отправить запрос на создание
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
