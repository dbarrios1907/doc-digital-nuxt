export default {
  title: 'Style Guide/DocUploadCard',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <div>
      <doc-upload-card class="d-inline-flex">
        <template v-slot:header>
            <doc-sign-icon fill="white" color="primary" />
        </template>

        <template v-slot:body>
            Sube un documento y envíalo para firmar
        </template>

        <template v-slot:footer>
            FIRMADOR
        </template>
      </doc-upload-card>

      <doc-upload-card class="d-inline-flex">
        <template v-slot:header>
            <doc-signed-icon fill="white" color="primary" />
        </template>

        <template v-slot:body>
            Sube un documento firmado y envíalo para su distribución
        </template>

        <template v-slot:footer>
            DESPACHADOR
        </template>
      </doc-upload-card>
      </div>
    `,
})

export const Default = Template.bind({})
Default.args = {}
