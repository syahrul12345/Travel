import React, { Fragment } from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from '../src/utils/theme'

class _Document extends Document {
  render () {
    return (
      <html lang='en-US' dir='ltr'>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <body>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=1028885374122493&autoLogAppEvents=1"></script>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

_Document.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: WrappedComponent => props => sheets.collect(<WrappedComponent {...props} />)
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </Fragment>
    )
  }
}

export default _Document
