import DxEntityOverflow from './'

export default {
  title: 'Components/Entity Overflow',
  argTypes: {},
}

const wrapper = {
  template: `
    <v-row>
      <v-col cols="12" sm="6" lg="5" style="background-color: #093F75">
          <slot></slot>
      </v-col>
    </v-row>
  `,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    DxEntityOverflow,
    wrapper,
  },
  data: () => ({
    entities: ['Entidad 1', 'Entidad 2', 'Entidad 3', 'Entidad 4'],
  }),
  template: `
    <wrapper>
      <dx-entity-overflow :items="entities" label="Overflow Btn w/ disabled" />
    </wrapper>
  `,
})

export const EntitySelectDropdown = Template.bind({})
EntitySelectDropdown.args = {}
