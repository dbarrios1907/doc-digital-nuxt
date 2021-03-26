function checkPermission(el, binding, vnode) {
  const { value } = binding
  const store = vnode?.context?.$store
  const roles = store?.getters && store?.getters?.roles

  if (!roles) throw new Error(`No roles where found for the user`)

  if (roles.some(role => role === 'ROLE_ADMIN' || role === 'ROLE_JEFE_SERVICIO' || role === 'ROLE_SUPERADMIN')) return true

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding, vnode) {
    checkPermission(el, binding, vnode)
  },
  update(el, binding, vnode) {
    checkPermission(el, binding, vnode)
  },
}
