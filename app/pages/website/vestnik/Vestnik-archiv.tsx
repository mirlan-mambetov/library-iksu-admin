import { vestnikApi } from '@/../api/vestnik/Vestnik-api'
import { ButtonComponent, VestnikMaterials } from '@/components'
import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import { Layout } from '@/layout/Layout'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useContext, useEffect, useState } from 'react'

export const VestnikArchiv: FC = () => {
	const [archivId, setArchivId] = useState(null)
	const { handlerOpen } = useContext(ModalComponentInitialContext)
	const { data: archiv } = vestnikApi.useFetchArchivByIdQuery(archivId, {
		skip: !archivId
	})
	const router = useRouter()
	useEffect(() => {
		setArchivId(router.query.id)
	}, [router])

	return (
		<Layout title={`Архив Вестника ${archiv ? archiv.name : ''}`}>
			<Box my={4}>
				<Text fontSize='2xl'>Вестник - архив {archiv?.name}</Text>
				<Text fontSize='xs' mt={3}>
					Всего материалов в архиве {archiv?.name}
					<span
						style={{
							display: 'inline-block',
							marginLeft: '20px',
							color: 'red',
							textDecoration: 'underline'
						}}
					>
						{archiv?.materials.length}
					</span>
				</Text>
				<ButtonComponent
					mt={4}
					btnType='Insert'
					size='xs'
					onClick={() => handlerOpen(archiv.id, 'CREATEVESTNIKMATERIAL', 'ADD')}
				/>
			</Box>
			<Box>
				<VestnikMaterials id={archivId} />
			</Box>
		</Layout>
	)
}
