import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from '~/plugins/vee-validate'
import { required, email } from 'vee-validate/dist/rules'

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Add a rule.
extend('required', {
  ...required,
  message: 'Este campo no puede estar vacío',
})

extend('email', {
  ...email,
  message: 'El correo ingresado no tiene un formato correcto.',
})

extend('nameOrLastname', {
  ...email,
  message: 'El correo ingresado no tiene un formato correcto.',
})
