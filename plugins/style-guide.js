import { pluginFactory } from '~/shared/utils/plugins'
import * as _styleGuideComponents from '~/components/style-guide'
import Vue from 'vue'

const components = Object.keys(_styleGuideComponents).reduce((acc, key) => {
  const name = _styleGuideComponents[key].name
  acc[name] = _styleGuideComponents[key]
  return acc
}, {})

const StyleGuidePlugin = /*#__PURE__*/ pluginFactory({
  components,
})

Vue.use(StyleGuidePlugin)

export default StyleGuidePlugin
