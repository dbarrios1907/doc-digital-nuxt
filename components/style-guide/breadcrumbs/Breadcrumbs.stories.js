export default {
  title: 'Style Guide/Breadcrumbs',
  argTypes: {},
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      items: [
        {
          text: 'Administración',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Documentos',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Enviados Pendientes',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  template: `
    <dx-breadcrumbs :items="items" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
