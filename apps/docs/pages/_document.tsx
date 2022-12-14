import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="description" content="Generated by Tony" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
