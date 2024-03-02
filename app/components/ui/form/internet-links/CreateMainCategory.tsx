import { isFetchBaseQueryError } from '@/../api/api.helper'
import { internetLinkApi } from '@/../api/internet-links/Internet-link.service'
import { isErrorWithMessage } from '@/../utils/error-handler'
import { inputStyles, labeleStyle } from '@/../utils/styles'
import { useModalComponent } from '@/hooks/use.modal'
import { IInternetLink } from '@/interfaces/Internet-links.interface'
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

export const CreateLinkMainCategory: FC = () => {
	const { handlerClose } = useModalComponent()
	const toastr = useToast()

	const [creteMainCategory, { isLoading }] =
		internetLinkApi.useCreateLinkMainCategoryMutation()

	const submitHandler = async (values, actions) => {
		try {
			await creteMainCategory({ data: values })
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
			initialValues={{ name: '' }}
			validate={values => {
				const errors = {} as Pick<IInternetLink, 'name'>
				if (!values.name) {
					errors.name = 'Название обязательно'
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
