import EmailDestinationList from './index'

export default {
  title: 'DocDigital',
  component: EmailDestinationList,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EmailDestinationList },
  data: () => ({
    destinations: [
      {
        id: '1',
        name: 'Dirección de Presupuestos',
      },
      {
        id: '2',
        name: 'email@entidad.gob.cl',
        cc: true,
      },
      {
        id: '3',
        name: 'Tesorería General de la República',
      },
      {
        id: '4',
        name: 'Dirección Nacional de Servicio Civil',
      },
      {
        id: '5',
        name: 'Servicio Nacional de Aduanas',
        cc: true,
      },
    ],
  }),
  methods: {
    removeItem(item, index) {
      this.destinations = this.destinations.filter(v => v.id !== item.id)
    },
  },
  template: `
    <email-destination-list :list='destinations' @onRemove='removeItem'></email-destination-list>
  `,
})

export const DestinationList = Template.bind({})
DestinationList.args = {}
