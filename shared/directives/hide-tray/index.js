import get from 'lodash.get'

function hideTray(el, binding, vnode) {
  const { value } = binding
  const store = vnode?.context?.$store
  console.log(store)
  const stateProp = get(store.state, value, null)

  if (stateProp === 0 || stateProp === false) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  inserted(el, binding, vnode) {
    hideTray(el, binding, vnode)
  },
  update(el, binding, vnode) {
    hideTray(el, binding, vnode)
  },
}
