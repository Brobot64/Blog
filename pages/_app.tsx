import React, { useEffect, useState } from 'react'
import { LayOut } from '../components';
import '../styles/globals.css'
import '../styles/globals.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayOut>
      <Component {...pageProps} />
    </LayOut>
  )
}

export default MyApp
