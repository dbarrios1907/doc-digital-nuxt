import ToastService from './ToastService'
export default {
  title: 'Style Guide/Alerts',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      positions: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
      position: 'topRight',
      timer: 5,
      showLeftIcn: true,
      showCloseIcn: true,
      count: 0,
      buttonClicked: false,
      title: 'Vue Notification',
      message: 'Tu sesión terminará en 30 segundos por inactividad, realiza cambios en la página para mantenerte contectado',
      config: {},
    }
  },
  computed: {
    getConfig() {
      return (this.config = {
        position: this.position,
        duration: this.timer * 1000,
        showLeftIcn: this.showLeftIcn,
        showCloseIcn: this.showCloseIcn,
        title: this.title,
      })
    },
  },
  methods: {
    notif(type) {
      const config = this.getConfig
      this.buttonClicked = true

      ToastService[type]({
        message: this.message,
        ...config,
      })
    },
    remove() {
      ToastService.closeAll()
    },
  },
  template: `
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field v-model="title" :counter="80" label="Title" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="message" :counter="160" label="Message" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        Position
        <v-select
            v-model="position"
            :items="positions"
            label="Position"
            :disabled="buttonClicked"
        ></v-select>
      </v-flex>
      <v-flex xs6>
        Timer
        <v-slider v-model="timer" thumb-label="always"></v-slider>
      </v-flex>
      <v-flex xs6>
        showLeftIcn
        <v-checkbox v-model="showLeftIcn" label="Allow you to display hide the left icone"></v-checkbox>
      </v-flex>
      <v-flex xs6>
        showCloseIcn
        <v-checkbox v-model="showCloseIcn" label="Allow you to display hide the close button"></v-checkbox>
      </v-flex>
      
      <v-flex xs12>
        <v-btn color="primary" @click="notif('info')">info</v-btn>
        <v-btn color="success" @click="notif('success')">success</v-btn>
        <v-btn color="error" @click="notif('error')">error</v-btn>
        <v-btn color="warning" @click="notif('warning')">warning</v-btn>
        <v-btn @click="remove()">Remove All</v-btn>
      </v-flex>

      <v-flex xs12>
        <p>{{getConfig}}</p>
      </v-flex>
    </v-layout>
    </v-container>
  `,
})

export const ToastDocDigital = Template.bind({})
ToastDocDigital.args = {}
