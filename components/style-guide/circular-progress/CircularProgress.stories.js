export default {
  title: 'Style Guide/Circular Progress',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'error'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      interval: {},
      value: 0,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
  template: `
    <div class="text-center">
      <v-progress-circular
          v-bind="$props"
          :rotate="180"
          :size="70"
          :width="5"
          :value="value"
      >
        <span class="font-large weight-600 darken-4" style="color: #373737;">{{ value }}%</span>
      </v-progress-circular>
    </div>
  `,
})

export const PrimaryCircularProgress = Template.bind({})
PrimaryCircularProgress.args = {
  color: 'primary',
}

export const ErrorCircularProgress = Template.bind({})
ErrorCircularProgress.args = {
  color: 'error',
}
