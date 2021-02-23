export default {
  title: 'Style Guide/Alerts',
  argTypes: {},
}

export const AlertTypes = () => ({
  data: () => ({
    visible: false,
    message: 'My timeout is set to 2000.',
  }),
  template: `
    <div>
      <Alert absolute centered type="success">¡Sus cambios se han guardado exitosamente!</Alert>
      <Alert absolute bottom left type="error">Ha ocurrido un error, intente guardar nuevamente.</Alert>
      <Alert absolute bottom right type="error" outlined>Ha ocurrido un error, intente guardar nuevamente.</Alert>
      <Alert absolute top lef type="warning">¡Por favor revise sus cambios antes de continuar!</Alert>
      <Alert absolute top right type="warning" outlined>¡Por favor revise sus cambios antes de continuar!</Alert>
      <Alert type="info">Tu sesión terminará en 30 segundos por inactividad, realiza cambios en la página para mantenerte contectado</Alert>
      <Alert type="info" outlined>Tu sesión terminará en 30 segundos por inactividad, realiza cambios en la página para mantenerte contectado</Alert>
    </div>
  `,
})
