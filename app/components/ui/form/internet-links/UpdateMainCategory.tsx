import { internetLinkApi } from '@/../api/internet-links/Internet-link.service'
import { errorsHandler, isErrorWithMessage } from '@/../utils/error-handler'
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

interface IUpdateInternetLinkCategoryProps {
	id: number
}
export const UpdateInternetLinkCategory: FC<{ updatedId: number }> = ({
	updatedId
}) => {
	const { handlerOpen, handlerClose } = useModalComponent()
	const [updateLinkCategory, { isLoading }] =
		internetLinkApi.useUpdateLinkCategoryMutation()

	const toastr = useToast()

	const submitHandler = async (values, actions) => {
		try {
			await updateLinkCategory({ data: values, id: updatedId })
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
					</div>
				</Form>
			)}
		</Formik>
	)
}
