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
      <dx-button
        absolute
        top='10'
        left='10'
          v-tooltip="{
              content: 'My large tooltip text',
          }"
          color="primary"
          v-bind="attrs"
          v-on="on"
      >
        <span class="text-underline">Bottom</span>
      </dx-button>

      <dx-button
        absolute
        top='10'
        right='10'
        v-tooltip="{
              content: 'My large tooltip text',
              manual: true
          }"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <span class="text-underline">Bottom</span>
      </dx-button>

      <dx-button
        absolute
        bottom='10'
        right='10'
        v-tooltip="{
              content: 'My large tooltip text',
              manual: true
          }"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <span class="text-underline">Top</span>
      </dx-button>
      <dx-button
        absolute
        bottom='10'
        left='10'
        v-tooltip="{
              content: 'My large tooltip text',
              manual: true
          }"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <span class="text-underline">Top </span>
      </dx-button>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
