<template>
  <v-dialog v-model="dialog" overlay-opacity="0.55" rlay-color="#001C41" max-width="603px" :content-class="ismobil" class="v-dialog-details">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text font-roboto">{{ headTitle }}</h5>
        <v-spacer />
        <slot name="actionclose" />
      </v-card-title>
      <v-divider />

      <v-card-text class="mt-6">
        <v-row>
          <v-col>
            <DocumentTableItem :items="items" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <div :class="['pr-2 mb-7', { 'text-center': ismobil }]">
          <slot name="actions" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AdminDetail',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: [],
    },
    headTitle: String,
  },
  data() {
    return {}
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'movil-container' : ''
    },
  },
}
</script>
<style scoped lang="scss">
.v-sheet.v-card,
.v-dialog__content .v-dialog,
.v-dialog:not(.v-dialog--fullscreen) {
  border-radius: 0px !important;
  max-height: 100% !important;
}
.v-card__title {
  max-height: 60px !important;
  padding: 13px 15px 10px !important;
}

.v-card__actions {
  display: flow-root !important;
  text-align: right;
  margin-right: 10px;
}
.table--details {
  width: 100% !important;
}
</style>
