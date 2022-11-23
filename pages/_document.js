// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
import CommonScript from '@/components/CommonScript'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.LANG} className='test'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
          { BLOG.CUSTOM_FONT
            ? BLOG.CUSTOM_FONT_URL?.map(fontUrl =>
                <link href={`${fontUrl}`} key={fontUrl} rel='stylesheet' />)
            : <link href='https://fonts.font.im/css2?family=Noto+Serif+SC&display=swap' rel='stylesheet' /> }
          <CommonScript />
        </Head>

        <body className={'tracking-wider subpixel-antialiased bg-day dark:bg-night'}>
            <Main />
            <NextScript />
            <div class="Canvas" style="position: fixed; right: 10px; bottom: 10px;z-index: 99999999" id="L2dCanvas"></div>
            <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/pixi.js@4.6.1/dist/pixi.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/live2dv3@1.2.2/live2dv3.min.js"></script>
            <script>window.onload = () => {new l2dViewer({el: document.getElementById('L2dCanvas'),basePath: 'https://cdn.jsdelivr.net/gh/KelsAstell/Live2dV3@latest/assets',modelName: 'Live2D',sounds: ['']})}</script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
