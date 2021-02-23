import Vue from 'vue'
import Ratings from './Ratings.vue'

Vue.component('doc-ratings', Ratings)

export default {
  title: 'Style Guide/Ratings',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      ratings: 0,
    }
  },
  template: `
    <div>
      <doc-ratings small :v-model="ratings"/>
      <doc-ratings  :v-model="ratings"/>
      <doc-ratings large :v-model="ratings"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
