import { inputStyles, labeleStyle } from '@/../utils/styles'
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
	Text
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoSendSharp } from 'react-icons/io5'

// interface IHeroDTO {
// 	title: string
// 	background: FileList
// }
interface IHeroDto {
	title: string
	background: string
}
export const UpdateHero: FC<{ id: number }> = () => {
	const [preview, setPreview] = useState(false)
	const [image, setImage] = useState(null)

	const submitHandler = (values, actions) => {
		console.log(values)
	}

	return (
		<Formik
			initialValues={{ title: '', background: '' }}
			validate={values => {
				const errors = {} as IHeroDto
				if (!values.title) {
					errors.title = 'Заголовок обязателен'
				} else if (!values.background) {
					errors.background = 'Выберите изображение'
				} else {
					setPreview(true)
				}
				return errors
			}}
			onSubmit={(values, actions) => submitHandler(values, actions)}
		>
			{({ errors, touched, values, handleChange, isValid, setFieldValue }) => (
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
						{/* {preview && (
							<Box sx={{ width: '100%' }}>
								<Text fontSize='xs' mb={1}>
									превью
								</Text>
								<Image src={image} width={150} height={150} />
							</Box>
						)} */}
						<InputGroup>
							<FormControl
								isInvalid={errors.background && touched.background}
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
									name='background'
									accept='image/**'
									onChange={e => {
										setFieldValue('background', e.currentTarget.files[0])
										setImage(e.currentTarget.files[0])
									}}
									hidden
									id='upload'
								/>
								<FormErrorMessage pl={4} pt={3}>
									{errors.background}
								</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<Button
							type='submit'
							colorScheme='whatsapp'
							rightIcon={<IoSendSharp size='12px' />}
							color='whiteAlpha.900'
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								width: '100%',
								mt: '20px'
							}}
						>
							Обновить
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}
