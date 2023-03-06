import { partnersApi } from '@/../api/partners/partners-api'
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

export const CreatePartner: FC = () => {
	const { handlerClose } = useContext(ModalComponentInitialContext)
	const toastr = useToast()
	const [createPartner] = partnersApi.useCreatePartnerMutation()
	const [image, setImage] = useState(null)
	const submitHandler = async (values, actions) => {
		try {
			const formData = new FormData()
			formData.append('link', values.link)
			formData.append('file', values.image)
			await createPartner(formData)
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
			initialValues={{ image: '', link: '' }}
			validate={values => {
				const errors = {} as { image: string; link: string }
				if (!values.image) {
					errors.image = 'Выберите изображение'
				} else if (!values.link) {
					errors.link = 'Ссылка обязательна'
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
						<InputGroup>
							<FormControl isInvalid={errors.link && touched.link}>
								<FormLabel {...labeleStyle}>
									Ссылка (обязательно должна включать протокол, абсолютный путь)
								</FormLabel>
								<Input
									type='text'
									sx={inputStyles}
									name='link'
									onChange={handleChange}
									value={values.link}
									placeholder='в формате http(https)://example.com'
								/>
								<FormErrorMessage>{errors.link}</FormErrorMessage>
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
