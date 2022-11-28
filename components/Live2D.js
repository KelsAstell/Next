/* eslint-disable no-undef */
import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

export default function Live2D() {
  if (!BLOG.WIDGET_PET || !JSON.parse(BLOG.WIDGET_PET)) {
    return <></>
  }
  const { switchTheme } = useGlobal()

  function handleClick() {
    if (BLOG.WIDGET_PET_SWITCH_THEME) {
      switchTheme()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', initLive2D)
    return () => {
      window.removeEventListener('scroll', initLive2D)
    }
  }, [])
  return <div id="waifu">
             <div id="waifu-message"></div>
             <div class="waifu-tool">
//                 <span class="icon-next"></span>
//                 <span class="icon-home"></span>
                 <span class="icon-message"></span>
//                 <span class="icon-camera"></span>
//                 <span class="icon-volumeup"></span>
//                 <span class="icon-volumedown"></span>
                 <span class="icon-about"></span>
                 <span class="icon-cross"></span>
             </div>
             <canvas id="live2d2" onClick={handleClick}></canvas>
             <canvas id="live2d4" onClick={handleClick}></canvas>
         </div>
//  return <canvas id="live2d" className='cursor-pointer' width="280" height="250" onClick={handleClick} alt='切换主题' title='切换主题' />
}

/**
 * 加载宠物
 */
function initLive2D() {
  window.removeEventListener('scroll', initLive2D)
  setTimeout(() => {
    // 加载 waifu.css live2d.min.js waifu-tips.js
    if (screen.width >= 768) {
      Promise.all([
        // loadExternalResource('https://cdn.zhangxinxu.com/sp/demo/live2d/live2d/js/live2d.js', 'js')
        loadExternalResource('https://cdn.jsdelivr.net/gh/KelsAstell/Live2dOnWeb@master/dist/live2d_bundle.js', 'js')
      ])
    }
  }, 300)
}
