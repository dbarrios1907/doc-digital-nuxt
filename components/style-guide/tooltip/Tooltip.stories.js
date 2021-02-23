export default {
  title: 'Style Guide/Tooltip',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <Button
              color="primary"
              v-bind="attrs"
              v-on="on"
          >
            <span class="text-underline">Left</span>
          </Button>
        </template>
        <span>Left tooltip</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <Button
              color="secondary"
              v-bind="attrs"
              v-on="on"
          >
            Bottom
          </Button>
        </template>
        <span>Bottom tooltip</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <Button
              color="dark"
              v-bind="attrs"
              v-on="on"
          >
            Right
          </Button>
        </template>
        <span>Right tooltip</span>
      </v-tooltip>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
