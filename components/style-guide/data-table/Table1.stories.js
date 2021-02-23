import Vue from 'vue'
//import DataTable from './DataTable.vue'
import TableStory1 from './story-components/DataTable1.vue'

//Vue.component('DataTable', DataTable)
Vue.component('table-story-1', TableStory1)

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
    <table-story-1 />
  `,
})

export const Table1 = Template.bind({})
Table1.args = {}
