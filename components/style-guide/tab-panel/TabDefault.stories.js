export default {
  title: 'Style Guide/Tabs/Tab Default',
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
        { tab: 'Resueltos', number: 0},
        { tab: 'Pendientes', number: 2 },
        { tab: 'Borradores', number: 3 },
      ],
    }
  },
  //html
  template: `
  <div>
      <dx-tabs :items="items" defaultTab>
        <template v-slot:tab-item>
          <v-tab-item v-for="item in items" :key="item.tab">
            <table-story-1 />
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
