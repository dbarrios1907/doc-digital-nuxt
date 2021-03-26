<template>
  <v-row>
    <v-col cols="12" class="mt-3 mb-7 d-md-flex d-lg-flex d-xl-flex">
      <dx-bodytitle>
        <template v-slot:title>
          <div class="weight-700 font-title line-height-29">Nuevo documento a distribuir</div>
        </template>
        <template v-slot:subtitle>
          <p class="weight-400 mt-3 font-regular line-height-24">
            Complete los campos solicitados para ingresar un nuevo documento a distribuir. <br />
            (*) campos obligatorios.
          </p>
        </template>
      </dx-bodytitle>
    </v-col>

    <v-col cols="12">
      <dx-stepper v-model="activeStep">
        <v-stepper-header>
          <v-stepper-step :complete="activeStep > 1" step="1"> 1. Documento </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="activeStep > 2" step="2"> 2. Visación </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="activeStep > 3" step="3"> 3. Firma </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="activeStep > 4" step="4"> 4. Folio </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="activeStep > 5" step="5"> 5. Destinatarios </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <LazyStepDocInfoProvider ref="docInfo" />
            <dx-step-actions :steps="steps" :step="1" @onComplete="complete" @onNext="next($refs.docInfo)" @onBack="back" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <LazyStepVisaProvider ref="visa" />
            <dx-step-actions :steps="steps" :step="2" @onComplete="complete" @onNext="next($refs.visa)" @onBack="back" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <LazyStepSignatureProvider ref="signature" />
            <dx-step-actions :steps="steps" :step="3" @onComplete="complete" @onNext="next($refs.signature)" @onBack="back" />
          </v-stepper-content>
          <v-stepper-content step="4">
            <LazyStepFolio ref="folio" />
            <dx-step-actions :steps="steps" :step="4" @onComplete="complete" @onNext="next($refs.folio)" @onBack="back" />
          </v-stepper-content>
          <v-stepper-content step="5">
            <StepDestination />
            <dx-step-actions :steps="steps" :step="5" @onComplete="complete" @onNext="next" @onBack="back" />
          </v-stepper-content>
        </v-stepper-items>
      </dx-stepper>

      <div class="text-right mt-8 mb-9">
        <dx-button color="primary" small text>
          <dx-icon right chevron> mdi-close</dx-icon>
          <span class="underline-text ml-1">Descartar borrador</span>
        </dx-button>
        <dx-button color="primary" small text>
          <dx-icon right chevron> mdi-content-save</dx-icon>
          <span class="underline-text ml-1">Guardar borrador</span>
        </dx-button>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    activeStep: 1,
    steps: 5,
  }),
  methods: {
    complete() {
      alert('Reached Final Step')
    },
    async next(stepComponent) {
      const valid = await stepComponent?.$children[0]?.validate()
      if (valid) this.activeStep += 1
    },
    back() {
      this.activeStep -= 1
      // console.log('Previous Step', this.activeStep)
    },
  },
}
</script>
