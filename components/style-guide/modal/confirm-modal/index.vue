<template>
  <v-dialog
    v-model="dialog"
    overlay-opacity="0.55"
    overlay-color="#001C41"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    persistent
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">{{ title }}</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click.native="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="darken1" />

      <v-card-text v-show="!!message" class="font-roboto weight-400 line-height-30 font-20 darken3--text px-6 py-8"> {{ message }} </v-card-text>

      <v-card-actions class="px-5 justify-center">
        <dx-button color="primary" outlined @click.native="cancel">
          <dx-icon left regular> mdi-close</dx-icon>
          <span class="text-underline">
            <span class="underline-text">{{ options.cancelText }}</span>
          </span>
        </dx-button>

        <dx-button color="primary" @click.native="agree">
          <dx-icon left regular> mdi-check </dx-icon>
          <span class="text-underline">
            <span class="underline-text">{{ options.agreeText }}</span>
          </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DxConfirmModal',
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
