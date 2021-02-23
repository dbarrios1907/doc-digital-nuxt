import { pluginFactory } from '~/shared/utils/plugins'
import * as _styleGuideComponents from './style-guide.components'

const components = Object.keys(_styleGuideComponents).reduce((acc, key) => {
  const name = _styleGuideComponents[key].name
  acc[name] = _styleGuideComponents[key]
  return acc
}, {})

const StyleGuidePlugin = /*#__PURE__*/ pluginFactory({
  components,
})

export default StyleGuidePlugin
