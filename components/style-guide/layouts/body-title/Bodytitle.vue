<template>
  <v-row no-gutters>
    <v-col cols="12" sm="9" md="9" lg="9" class="px-0">
      <slot name="title" />
      <slot name="subtitle" />
    </v-col>
    <v-col v-if="!_isMobile" cols="0" sm="3" md="3" lg="3" class="d-flex justify-end">
      <dx-icons-actions class="d-none mt-1 px-0" />
    </v-col>
  </v-row>
</template>

<script>
import { responsiveMixin } from '~/shared/mixins/responsiveMixin'

export default {
  name: 'DxBodytitle',
  mixins: [responsiveMixin],
  inheritAttrs: false,
}
</script>
<style scoped></style>
