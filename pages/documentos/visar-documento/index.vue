<template>
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
        <StepDocInfo />
        <dx-step-actions :steps="steps" :step="1" @onComplete="complete" @onNext="next" @onBack="back" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <StepVisa />
        <dx-step-actions :steps="steps" :step="2" @onComplete="complete" @onNext="next" @onBack="back" />
      </v-stepper-content>
      <v-stepper-content step="3">
        <StepSignature />
        <dx-step-actions :steps="steps" :step="3" @onComplete="complete" @onNext="next" @onBack="back" />
      </v-stepper-content>
      <v-stepper-content step="4">
        <StepFolio />
        <dx-step-actions :steps="steps" :step="4" @onComplete="complete" @onNext="next" @onBack="back" />
      </v-stepper-content>
      <v-stepper-content step="5">
        <StepDestination />
        <dx-step-actions :steps="steps" :step="5" @onComplete="complete" @onNext="next" @onBack="back" />
      </v-stepper-content>
    </v-stepper-items>
  </dx-stepper>
</template>

<script>
export default {
  data: () => ({
    activeStep: 1,
    steps: 5,
  }),
  mounted() {
    console.log(this.activeStep)
  },
  methods: {
    complete() {
      console.log('Reached Final Step')
      alert('Reached Final Step')
    },
    next() {
      this.activeStep += 1
      // this.$nextTick(() => {
      //   console.log('Next Step', this.activeStep)
      // })
      // console.log('Next Step', this.activeStep)
    },
    back() {
      this.activeStep -= 1
      // console.log('Previous Step', this.activeStep)
    },
  },
}
</script>
