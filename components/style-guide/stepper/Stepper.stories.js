export default {
  title: 'Style Guide/Stepper or Wizard',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      e1: 1,
    }
  },
  template: `
  <dx-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
          1. Documento
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
          2. Destinatarios
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <dx-step-body>
          <dx-step-title title='This is a sample title for the step' help-hint='this is a help hint' />
        </dx-step-body>
        <dx-step-actions>

        </dx-step-actions>
      </v-stepper-content>
      <v-stepper-content step="2">
        <dx-step-body>
          <dx-step-title title='This is a sample title for the step' help-hint='this is a help hint' />
        </dx-step-body>
        <dx-step-actions>

        </dx-step-actions>
      </v-stepper-content>
    </v-stepper-items>
</dx-stepper>
  `,
})

export const Default = Template.bind({})
Default.args = {}
