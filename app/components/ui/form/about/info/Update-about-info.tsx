import { aboutInfoApi } from '@/../api/about/about-info/about-info-api'
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
	Textarea,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useContext, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const UpdateAboutInfo: FC<{ id: number }> = ({ id }) => {
	const { data: info, isLoading } = aboutInfoApi.useFetchAboutInfoByIdQuery(
		id,
		{ skip: !id }
	)
	const toastr = useToast()
	const [image, setImage] = useState(null)
	const { handlerClose } = useContext(ModalComponentInitialContext)

	const [updateInfo] = aboutInfoApi.useUpdateInfoMutation()

	const submitHandler = async (values, action) => {
		try {
			const formData = new FormData()
			if (values.title && values.description) {
				formData.append('title', values.title)
				formData.append('description', values.description)
			} else if (!values.title && values.description) {
				formData.append('description', values.description)
			} else if (!values.description && values.title) {
				formData.append('title', values.title)
			} else if (values.image) {
				formData.append('file', values.image)
			}
			await updateInfo({ id, data: formData })
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
				<span>загрузка данных...</span>
			) : (
				<Formik
					initialValues={{
						title: info?.title,
						description: info?.description,
						image: null
					}}
					onSubmit={(values, actions) => submitHandler(values, actions)}
					isInitialValid={values => !values}
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
									<FormControl>
										<FormLabel {...labeleStyle}>
											Заголовок (необязателен)
										</FormLabel>
										<Input
											sx={inputStyles}
											name='title'
											onChange={handleChange}
											value={values.title}
										/>
									</FormControl>
								</InputGroup>
								<InputGroup>
									<FormControl>
										<FormLabel {...labeleStyle}>
											Описание (необязателен)
										</FormLabel>
										<Textarea
											sx={inputStyles}
											name='description'
											onChange={handleChange}
											value={values.description}
											h={40}
										/>
									</FormControl>
								</InputGroup>
								{info.image && (
									<InputGroup>
										<FormControl
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
												{image ? image.name : 'выберите файл'} (необязателен)
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
										</FormControl>
									</InputGroup>
								)}
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
			)}
		</>
	)
}
