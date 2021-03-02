import './EnvioRecepcion.scss'

export default {
  title: 'Style Guide/EnvioRecepcion',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template:   
  `<DxEnvioRecepcion />
  `,
})

export const Default = Template.bind({})
Default.args = {}
