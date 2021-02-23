// === Get Env Information Utils ===

export const hasWindowSupport = typeof window !== 'undefined'
export const hasDocumentSupport = typeof document !== 'undefined'
export const hasNavigatorSupport = typeof navigator !== 'undefined'
export const hasPromiseSupport = typeof Promise !== 'undefined'
export const hasMutationObserverSupport =
  typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined'

export const isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport

// Browser type sniffing
export const userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : ''

export const isJSDOM = userAgent.indexOf('jsdom') > 0
export const isIE = /msie|trident/.test(userAgent)

export const hasTouchSupport = isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEventSupport = isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)

export const hasIntersectionObserverSupport =
  isBrowser &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  // Edge 15 and UC Browser lack support for `isIntersecting`
  // but we an use intersectionRatio > 0 instead
  // 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype

// === Get node env key ===

export const getEnv = (key, fallback = null) => {
  const env = typeof process !== 'undefined' && process ? process.env || {} : {}
  if (!key) {
    /* istanbul ignore next */
    return env
  }
  return env[key] || fallback
}

export const getNoWarn = () => getEnv('BOOTSTRAP_VUE_NO_WARN')
