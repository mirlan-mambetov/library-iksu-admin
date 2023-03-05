import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import theme from '../utils/theme'
import {
	ModalComponentInitialContext,
	ModalComponentProvider
} from '@/contexts/Modal-component'
import { persistore, store } from '../store'
import NextNProgress from 'nextjs-progressbar'
import { PersistGate } from 'redux-persist/integration/react'
import { ProtectRoute } from '../protecte/auth.check'
import { DialogContext, DialogProvider } from '@/contexts/Dialog-context'

export default function App({ Component, pageProps }: AppProps) {
	const modalProvider = ModalComponentProvider()
	const dialogProvider = DialogProvider()

	return (
		<Provider store={store}>
			<NextNProgress options={{ showSpinner: false }} />
			<PersistGate persistor={persistore} loading={null}>
				<ChakraProvider theme={theme}>
					<ModalComponentInitialContext.Provider value={{ ...modalProvider }}>
						<ProtectRoute>
							<DialogContext.Provider value={{ ...dialogProvider }}>
								<Component {...pageProps} />
							</DialogContext.Provider>
						</ProtectRoute>
					</ModalComponentInitialContext.Provider>
				</ChakraProvider>
			</PersistGate>
		</Provider>
	)
}
