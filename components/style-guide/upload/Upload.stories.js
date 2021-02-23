import Upload from './Upload.vue'

export default {
  title: 'Style Guide/Upload',
  component: Upload,
  argTypes: {
    // color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    // disabled: { control: { type: 'boolean', default: false } },
    // multiple: { control: { type: 'boolean', default: true } },
    // manualUpload: { control: { type: 'boolean', default: false } },
    // removeEnabled: { control: { type: 'boolean', default: true } },
    // limit: { control: { type: 'number', default: 10000 } },
    // accept: { control: { type: 'text', default: '*' } },
  },
}

export const Demo = () => ({
  components: { Upload },
  template: `
    <v-row>
      <v-col lg="3" sm="6">
        <Upload multiple v-bind="$props"/>
      </v-col>
    </v-row>
  `,
})
