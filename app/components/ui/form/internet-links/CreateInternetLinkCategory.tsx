import { isFetchBaseQueryError } from '@/../api/api.helper'
import { internetLinkApi } from '@/../api/internet-links/Internet-link.service'
import { isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { useModalComponent } from '@/hooks/use.modal'
import { IInternetLinkCategory } from '@/interfaces/Internet-links.interface'
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC } from 'react'

export const CreateInternetLinkCategory: FC = () => {
	const { handlerClose, updatedId } = useModalComponent()
	const toastr = useToast()

	const [createLinkCategory, { isLoading }] =
		internetLinkApi.useCreateLinkCategoryMutation()

	const submitHandler = async (values, actions) => {
		try {
			await createLinkCategory({ data: values, id: updatedId })
				.unwrap()
				.then(() => handlerClose())
		} catch (err) {
			if (isFetchBaseQueryError(err)) {
				const errMsg =
					// @ts-ignore
					'error' in err ? err.error : JSON.stringify(err.data.message)
				// @ts-ignore
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
			initialValues={{ name: '', description: '', link: '' }}
			validate={values => {
				const errors = {} as IInternetLinkCategory
				if (!values.name) {
					errors.name = 'Название обязательно'
				} else if (!values.link) {
					errors.link = 'Ссылка обязательно'
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
					<div className='fields'>
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
							<FormControl isInvalid={errors.link && touched.link}>
								<FormLabel {...labeleStyle}>Ссылка</FormLabel>
								<Input
									sx={inputStyles}
									name='link'
									onChange={handleChange}
									value={values.link}
									placeholder='В формате www(https)://example.com'
								/>
								<FormErrorMessage>{errors.link}</FormErrorMessage>
							</FormControl>
						</InputGroup>
						<Button
							isLoading={isLoading}
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
					</div>
				</Form>
			)}
		</Formik>
	)
}
