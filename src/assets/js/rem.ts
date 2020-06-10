/**
 * @description 根据屏幕宽度动态设置根字体大小
 */
interface ILibUnit {
  rem: any
  winHeight: any
  winWidth: any
  rem2px: any
  px2rem: any
  vh2px: any
  px2vh: any
  px2px: any

}
import { isAndroid } from './weapon'
const LIB: ILibUnit = {
  rem: null,
  winHeight: null,
  winWidth: null,
  rem2px: null,
  px2rem: null,
  vh2px: null,
  px2vh: null,
  px2px: null,
}

const DESIGN_WIDTH = process.env.DESIGN_WIDTH || 750
const DESIGN_HEIGHT = process.env.DESIGN_HEIGHT || 1080
let rem2px: any
let px2rem: any
let vh2px: any
let px2vh: any
let px2px: any
let winHeight = 0
let winWidth = 0
let dpr = 1

// 视窗高度
if (window.innerHeight) {
  winHeight = window.innerHeight
} else if ((document.body) && (document.body.clientHeight)) {
  winHeight = document.body.clientHeight
}

try {
  const doc = window.document // 文档对象
  const docEl = doc.documentElement // 文档对象元素
  let metaEl = doc.querySelector('meta[name="viewport"]') // viewport 属性设置
  dpr = window.devicePixelRatio || 1 // 屏幕dpr
  let scale = 1 / dpr // viewport 缩放
  let tid: any = null // 定时器句柄

  /* viewport 属性设置不存在 */
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl)
    } else {
      let wrap = doc.createElement('div')
      wrap.appendChild(metaEl)
      doc.write(wrap.innerHTML)
    }
  }
  // 安卓手机bug，viewport缩放有问题
  if (isAndroid()) {
    scale = 1
  }
  // 设置viewport
  metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale +
    ',maximum-scale=2, minimum-scale=' + scale + ',user-scalable=no')
  // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute('data-dpr', dpr + '')

  // 设置根字体大小
  const refreshRem = () => {
    winWidth = docEl.getBoundingClientRect().width
    const rem = winWidth / 10
    docEl.style.fontSize = rem + 'px'
    if (window.innerHeight) {
      winHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight
    }
    LIB.rem = rem
    LIB.winHeight = winHeight
    LIB.winWidth = winWidth
  }
  // 首次加载设置根字体模块
  refreshRem()

  // 监听resize事件，设置根字体大小
  window.addEventListener('resize', () => {
    window.clearTimeout(tid)
    tid = window.setTimeout(refreshRem, 300)
  })

  // 监听页面刷新时间，设置根字体大小
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { // 如果从缓存读取页面则设置根字体大小
      window.clearTimeout(tid)
      tid = window.setTimeout(refreshRem, 300)
    }
  })

  /* 设置body字体大小为12px */
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', () => {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }

  /* rem转换成px */
  rem2px = LIB.rem2px = (d: any) => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) * LIB.rem
  }

  /* px转换成rem */
  px2rem = LIB.px2rem = (d: any) => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) / DESIGN_WIDTH * 10
  }

  /* vh转换成px */
  vh2px = LIB.vh2px = (d: any) => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) / 100 * winHeight
  }

  /* px转换成vh */
  px2vh = LIB.px2vh = (d: any) => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) / DESIGN_HEIGHT * 100
  }
  px2px = LIB.px2px = (d: any) => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(rem2px(px2rem(d)))
  }
} catch (error) {
  console.error('设置根字体失败：', error)
}

export default LIB
export { rem2px, px2rem, vh2px, px2vh, px2px, winWidth, winHeight }
