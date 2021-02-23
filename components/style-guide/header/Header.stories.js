import Header from './Header'

export default {
  title: 'Style Guide/Header',
  component: Header,
  argTypes: {
    colorlinea1: { control: { type: 'color' } },
    colorlinea2: { control: { type: 'color' } },
    coloricon: { control: { type: 'color' } },
    widthlinea1: { control: { type: 'range', max: 200 } },
    widthlinea2: { control: { type: 'range', max: 200 } },
    widthicon: { control: { type: 'range', max: 200 } },
    heighticon: { control: { type: 'range', max: 40 } },
    pos: { control: { type: 'select', options: ['top', 'bottom'] } },
    size: { control: { type: 'range', max: 40 } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header },
  template: `
    <Header :color1="colorlinea1" :color2="colorlinea2" :color3="coloricon" :width1="widthlinea1" :width2="widthlinea2" :width3="widthicon" :height="heighticon" :pos="pos" :size="size" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  pos: 'top',
  colorlinea1: 'blue',
  widthlinea1: 77,
  colorlinea2: 'red',
  widthlinea2: 92,
  size: '30',
  coloricon: 'white',
  widthicon: 200,
  heighticon: 40,
}
