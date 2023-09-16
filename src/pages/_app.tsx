import { BlogContext, BlogContextProvider } from '@/store/post'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<BlogContextProvider >
			<Component {...pageProps} />
		</BlogContextProvider>)
}
