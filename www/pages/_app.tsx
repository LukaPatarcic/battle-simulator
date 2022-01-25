import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from "@helper/createEmotionCache";
import theme from "@helper/theme";
import {AppProps} from "next/app";
import {APP_NAME} from "@constant/index";

interface Props extends AppProps {
    emotionCache: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
      <CacheProvider value={emotionCache}>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>{APP_NAME}</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
  );
}
