export default {
  title: 'Style Guide/DatePicker',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: vm => ({
    date: new Date().toISOString(),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatHeader(date) {
      return date
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  template: `
    <v-row justify="center">
    <v-col lg="4">
      <v-date-picker
          no-title
          color="primary"
          v-model="date">
      </v-date-picker>
    </v-col>

    <v-col lg="4">
      <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              hide-details
              outlined
              dense
              v-model="dateFormatted"
              append-icon="mdi-calendar-month-outline"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
          ></v-text-field>
        </template>
        <dx-date-picker
            v-model="date"
            no-title
            color="primary"
            @input="menu1 = false"
        ></dx-date-picker>
      </v-menu>
    </v-col>

    <v-col lg="4"></v-col>
    </v-row>
  `,
})

export const Default = Template.bind({})
Default.args = {}
