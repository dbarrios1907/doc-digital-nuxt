import SectionLawInfo from './index.vue'

export default {
  title: 'DocDigital/Sections',
  component: SectionLawInfo,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    SectionLawInfo,
  },
  template: `
    <section-law-info />
  `,
})

export const SectionLawInfoStory = Template.bind({})
SectionLawInfoStory.args = {}
