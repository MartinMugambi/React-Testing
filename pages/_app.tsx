//global styles
import '../styles/globals.css'
import type { AppProps } from 'next/app'

//header component
import Header from '../components/header'

//global AppContext to pass downn states to all components
import AppContext from './context/appContext'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppContext>
			<Header />
			<Component {...pageProps} />
		</AppContext>
	)
}

export default MyApp
