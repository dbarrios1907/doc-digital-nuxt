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
    <v-stepper v-model="e1" alt-labels>
    <v-stepper-header>
      <v-stepper-step
          :complete="e1 > 1"
          step="1"
      >
        Name of step 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
          :complete="e1 > 2"
          step="2"
      >
        Name of step 2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Name of step 3
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
        ></v-card>

        <v-btn
            color="primary"
            @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
        ></v-card>

        <v-btn
            color="primary"
            @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
        ></v-card>

        <v-btn
            color="primary"
            @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
    </v-stepper>
  `,
})

export const Default = Template.bind({})
Default.args = {}
