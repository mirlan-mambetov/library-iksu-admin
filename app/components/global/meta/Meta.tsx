import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { IMetaProps } from './Meta.props'

export const Meta: FC<PropsWithChildren<IMetaProps>> = ({
	children,
	description,
	indexes,
	title
}) => {
	return (
		<Head>
			<title itemProp='headline'>{title}</title>
			{!indexes ? (
				<meta name='robots' content='noindex, nofollow' />
			) : (
				<>
					<meta name='description' content={description} />
					{children}
				</>
			)}
		</Head>
	)
}
