<template>
  <v-row dx-step-actions no-gutters class="primary">
    <v-col cols="6" class="d-flex justify-start align-center">
      <keep-alive>
        <!-- my-component will be intentionally kept in memory even when removed -->
        <dx-step-button v-if="_hasBack" color="white" text @click="_onBack">
          <dx-icon right class="mr-1 ml-0"> mdi-arrow-left </dx-icon>
          <span class="underline-text">Anterior</span>
        </dx-step-button>
      </keep-alive>
    </v-col>
    <v-col cols="6" class="d-flex justify-end align-center">
      <keep-alive>
        <!-- my-components will be intentionally kept in memory even when removed -->
        <dx-step-button v-if="_finalStep" color="white" text class="success" @click="_onFinal">
          <span class="underline-text">Finalizar y enviar</span>
          <dx-icon right> mdi-send</dx-icon>
        </dx-step-button>
        <dx-step-button v-else color="white" text @click="_onNext">
          <span class="underline-text">Siguiente</span>
          <dx-icon right> mdi-arrow-right</dx-icon>
        </dx-step-button>
      </keep-alive>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'DxStepActions',
  props: {
    step: {
      type: Number,
      default: () => 1,
    },
    steps: {
      type: Number,
      default: () => 1,
    },
  },
  computed: {
    _hasBack() {
      return this.step > 1
    },
    _finalStep() {
      return this.step === this.steps
    },
  },
  methods: {
    _onFinal() {
      this.$emit('onComplete')
    },
    _onNext() {
      this.$emit('onNext')
    },
    _onBack() {
      this.$emit('onBack')
    },
  },
}
</script>
<style lang="scss">
[dx-step-actions] {
  overflow: visible;
}
</style>
