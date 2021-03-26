import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
import { required, email, max, digits, regex } from 'vee-validate/dist/rules'
import { pluginFactory } from '~/shared/utils/plugins'

// Add a rule.
extend('required', {
  ...required,
  message: 'Este campo es requerido',
})

extend('email', {
  ...email,
  message: 'El correo ingresado no tiene un formato correcto.',
})

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} debe tener {length} digitos. ({_value_})',
})

extend('max', {
  validate(value, { length }) {
    return value.length < length
  },
  params: ['length'],
  message: 'Este campo no debe exceder {length} caracteres',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} no corresponde con el formato {regex}',
})

const VeeValidatePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})

Vue.use(VeeValidatePlugin)

export default VeeValidatePlugin
