export default {
  title: 'Style Guide/LinearProgress',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    skill: 20,
    knowledge: 33,
    power: 78,
  }),
  template: `
    <div>
        <v-progress-linear
            v-model="power"
            color="#0F69C4"
            background-color="#CFE1F3"
        ></v-progress-linear>
        <br>
        <v-progress-linear
            v-model="power"
            color="error"
        ></v-progress-linear>
    
        <br>
        
        <v-progress-linear
            color="#0F69C4"
            background-color="#CFE1F3"
            v-model="knowledge"
            height="48"
            class="neutral--text"
        >
          <template v-slot:default="{ value }">
            <div style="flex: 1; justify-content: flex-start;">
              <strong class="px-2 white--text weight-700">{{ Math.ceil(value) }}%</strong>
            </div>
          </template>
        </v-progress-linear>

        <br>
        
        <v-progress-linear
            color="error"
            value="100"
            height="48"
        >

          <div style="display: flex; flex: 1; justify-content: flex-start; align-items: center;">
            <strong style="flex: 1 auto;" class="px-2 white--text weight-400 underline-text">
              Error de carga ¿Reintentar?
            </strong>           
            <div style="flex: none;" class="px-3 mt-1">
              <Reload />
            </div>
          </div>
        </v-progress-linear>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
