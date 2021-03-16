<template>
  <ErrorPage :link-target="$auth.options.redirect.login" :link-text="linkText" :sub-title="message" title="" />
</template>
<script>
export default {
  name: 'ForbiddenAccess',
  props: {
    linkText: {
      type: String,
      default: () => 'Inicia sessión nuevamente',
    },
    message: {
      type: String,
      default: () => 'Acceso no autorizado',
    },
  },
}
</script>
