export default {
  title: 'Style Guide/Tabs/Tab Outlined',
  argTypes: {
    backgroundColor: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Correo electrónico', icon: 'mdi-plus-circle-outline' },
        { tab: 'Oficina de Partes', icon: 'mdi-plus-circle-outline' },
        { tab: 'Lista guardada', icon: 'mdi-plus-circle-outline' },
      ],
    }
  },
  //html
  template: `
  <div>
      <dx-tabs :items="items" tabtype="outlined">
        <template v-slot:tab-item>
          <v-tab-item>
            <h4>Contenido 1</h4>
          </v-tab-item>
          <v-tab-item>
            <h4>Contenido 2</h4>
          </v-tab-item>
          <v-tab-item>
            <h4>Contenido 3</h4>
          </v-tab-item>
        </template>
      </dx-tabs>
  </div>
  `,
})

export const Neutral = Template.bind({})
Neutral.args = {
  color: 'primary',
}
