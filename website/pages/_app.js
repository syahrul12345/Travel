import React from 'react'
import App from 'next/app'
import Head from 'next/head'
// import withRedux from 'next-redux-wrapper'
// import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/utils/theme'

const _App = (
  class _App extends App {
    static async getInitialProps ({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      }
    }

    componentDidMount () {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render () {
      const {
        Component,
        pageProps,
        store
      } = this.props

      return (
          <MuiThemeProvider theme={theme}>
            <Head>
              <title>Smolidays</title>
            </Head>
            <CssBaseline />
            {/* <Provider store={store}> */}
              <Component {...pageProps} />
            {/* </Provider> */}
          </MuiThemeProvider>
      )
    }
  }
)

export default _App
