import Vue from 'vue'
import TableStory2 from './story-components/DataTable2.vue'

Vue.component('table-story-2', TableStory2)

export default {
  title: 'Style Guide/DataTable',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <table-story-2 />
  `,
})

export const Table2 = Template.bind({})
Table2.args = {}
