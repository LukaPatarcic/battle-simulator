import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { APP_NAME } from '@constant/index';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
