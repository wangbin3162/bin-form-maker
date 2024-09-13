import { watch } from 'vue'
import { Utils } from 'bin-ui-design'

export default function useLockScreen(visible) {
  const { addClass, removeClass, hasClass, getStyle, getScrollBarWidth } = Utils.dom
  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyPaddingRight = '0'
  let computedBodyPaddingRight = 0
  let timer = null
  watch(visible, val => {
    if (val) {
      if (timer) clearTimeout(timer)
      withoutHiddenClass = !hasClass(document.body, 'bin-popup-parent--hidden')
      if (withoutHiddenClass) {
        bodyPaddingRight = document.body.style.paddingRight
        computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10)
      }
      scrollBarWidth = getScrollBarWidth()
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
      const bodyOverflowY = getStyle(document.body, 'overflowY')
      addClass(document.body, 'bin-popup-parent--hidden')
      if (
        scrollBarWidth > 0 &&
        (bodyHasOverflow || bodyOverflowY === 'scroll') &&
        withoutHiddenClass
      ) {
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarWidth + 'px'
        addClass(document.body, 'with-scrollbar')
      }
    } else {
      timer = setTimeout(() => {
        if (withoutHiddenClass) {
          document.body.style.paddingRight = bodyPaddingRight
          removeClass(document.body, 'bin-popup-parent--hidden')
          removeClass(document.body, 'with-scrollbar')
        }
        withoutHiddenClass = true
      }, 300)
    }
  })
}
