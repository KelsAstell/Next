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
            <div id="waifu">
                         <div id="waifu-message"></div>
                         <div class="waifu-tool">
                             <span class="icon-message"></span>
                             <span class="icon-about"></span>
                             <span class="icon-cross"></span>
                         </div>
                         <canvas id="live2d2"></canvas>
                         <canvas id="live2d4"></canvas>
                     </div>
                     <script src="https://cdn.jsdelivr.net/gh/KelsAstell/Live2dOnWeb@master/dist/live2d_bundle.js"></script>
                     <script async type="module" src="https://cdn.jsdelivr.net/gh/KelsAstell/Live2dOnWeb@master/waifu-tips.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
