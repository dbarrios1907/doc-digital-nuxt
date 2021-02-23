import Vue from 'vue'
import Switch from './Switch.vue'

Vue.component('doc-switch', Switch)
export default {
  title: 'Style Guide/Switch',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      switch1: true,
      switch2: false,
      switch3: false,
    }
  },
  template: `
    <v-sheet class="pa-5">
      <doc-switch
          v-model="switch1"
          inset
          :ripple="false"
          dense
          :label="'Switch 1: '+ switch1.toString()"
      ></doc-switch>
      <v-switch
          v-model="switch2"
          inset
          dense
          :ripple="false"
          :label="'Switch 2: ' + switch2.toString()"
      ></v-switch>
      <doc-switch
          v-model="switch3"
          color="#04A398"
          inset
          dense
          :ripple="false"
          :label="'Switch 3: ' + switch3.toString()"
      ></doc-switch>
    </v-sheet>
  `,
})

export const Default = Template.bind({})
Default.args = {}
