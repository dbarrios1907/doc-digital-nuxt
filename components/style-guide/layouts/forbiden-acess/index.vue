<template>
  <ErrorPage :link-target="$auth.options.redirect.login" link-text="Inicia sessión nuevamente" sub-title="Acceso no autorizado" title="" />
</template>
<script>
export default {
  name: 'ForbiddenAccess',
}
</script>
