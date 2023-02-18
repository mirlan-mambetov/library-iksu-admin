import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from 'react-redux'
import theme from '../utils/theme'
import {
	ModalComponentInitialContext,
	ModalComponentProvider
} from '@/contexts/Modal-component'
import { persistore, store } from '../store'
import NextNProgress from 'nextjs-progressbar'
import { PersistGate } from 'redux-persist/integration/react'
import { ProtectRoute } from '../utils/auth.check'

export default function App({ Component, pageProps }: AppProps) {
	const modalProvider = ModalComponentProvider()

	return (
		<Provider store={store}>
			<NextNProgress options={{ showSpinner: false }} />
			<PersistGate persistor={persistore} loading={null}>
					<ChakraProvider theme={theme}>
						<ModalComponentInitialContext.Provider value={{ ...modalProvider }}>
							<ProtectRoute>
								<Component {...pageProps} />
							</ProtectRoute>
						</ModalComponentInitialContext.Provider>
					</ChakraProvider>
			</PersistGate>
		</Provider>
	)
}
