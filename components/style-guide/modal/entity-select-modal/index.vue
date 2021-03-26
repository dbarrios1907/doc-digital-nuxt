<template>
  <v-dialog
    v-model="dialog"
    overlay-opacity="0.55"
    overlay-color="#001C41"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    v-bind="$attrs"
    persistent
    v-on="$listeners"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">{{ title }}</h5>
      </v-card-title>
      <v-divider class="darken1" />

      <v-card-text v-show="!!message" class="font-roboto weight-400 line-height-30 font-20 darken3--text"> {{ message }} </v-card-text>

      <v-card-actions>
        <v-spacer />
        <dx-button color="primary" outlined v-bind="$props" class="text-none" @click.native="cancel">
          <span class="text-underline"> {{ options.cancelText }} </span>
        </dx-button>
        <dx-button color="primary" outlined v-bind="$props" class="text-none" @click.native="agree">
          <span class="text-underline"> {{ options.agreeText }} </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DxEntitySelectModal',
  inheritAttrs: false,
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      agreeText: 'Aceptar',
      cancelText: 'Cancelar',
      width: 320,
      zIndex: 200,
    },
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
