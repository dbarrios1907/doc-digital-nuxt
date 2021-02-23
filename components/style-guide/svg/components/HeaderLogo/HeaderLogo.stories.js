import Vue from 'vue'
import HeaderLogoCmp from './HeaderLogo.svg'

Vue.component('HeaderLogo', HeaderLogoCmp)

export default {
  title: 'Style Guide/SVG Images',
  argTypes: {
    color: { control: { type: 'color' } },
    width: { control: { type: 'range', max: 200 } },
    height: { control: { type: 'range', max: 40 } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div class="dark">
      <HeaderLogo />
    </div>
  `,
})

export const HeaderLogo = Template.bind({})
HeaderLogo.args = { color: 'red', width: 200, height: 40 }
