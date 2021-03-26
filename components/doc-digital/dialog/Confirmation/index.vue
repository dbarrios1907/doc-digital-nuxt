<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Confirmación </v-card-title>
      <v-card-text>{{ headTitle }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AdminComfirmation',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    headTitle: String,
  },
  data() {
    return {}
  },
}
</script>
