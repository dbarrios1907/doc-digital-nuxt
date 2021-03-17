import SectionPending from './index.vue'

export default {
  title: 'DocDigital/Sections',
  component: SectionPending,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    SectionPending,
  },
  data: () => ({
    visar: 123,
    firmar: 4,
    recibir: 2,
  }),
  template: `
    <section-pending :visar='visar' :firmar='firmar' :recibir='recibir'/>
  `,
})

export const SectionPendingStory = Template.bind({})
SectionPendingStory.args = {}
