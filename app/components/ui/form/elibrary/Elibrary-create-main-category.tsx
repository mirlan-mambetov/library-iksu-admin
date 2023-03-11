import { elibraryApi } from '@/../api/elibrary/elibrary-api'
import { byteToMb } from '@/../utils/converter'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const ElibraryCreateMainCategory: FC = () => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const [image, setImage] = useState(null)
	const [preview, setPreview] = useState(null)
	const toastr = useToast()
	const [createCategory, { isLoading }] =
		elibraryApi.useCreateMainCategoryMutation()

	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('image', values.image)
			await createCategory(formData)
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
			initialValues={{ name: '', image: '' }}
			validate={values => {
				const errors = {} as { name: string; image: string }
				if (!values.name) {
					errors.name = 'Название категории обязательно'
				} else if (!values.image) {
					errors.image = 'Выберите изображение'
				} else {
					setPreview(true)
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
							<FormControl isInvalid={errors.name && touched.name}>
								<FormLabel {...labeleStyle}>Название категории</FormLabel>
								<Input
									sx={inputStyles}
									name='name'
									onChange={handleChange}
									value={values.name}
								/>
								<FormErrorMessage>{errors.name}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						{preview && (
							<Box sx={{ width: '100%' }}>
								<Text fontSize='xs' mb={1} color='red.300'>
									превью изображения
								</Text>
								<Image
									src={URL.createObjectURL(image)}
									width={150}
									height={150}
								/>
								<Box sx={{ mt: '20px' }}>
									<Text fontSize='xs' color='blue.400'>
										размер изображения: {byteToMb(image.size)}
									</Text>
									<Text fontSize='xs' color='blue.400'>
										допустимый лимит: 20мб
									</Text>
								</Box>
							</Box>
						)}
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
										setPreview(true)
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
