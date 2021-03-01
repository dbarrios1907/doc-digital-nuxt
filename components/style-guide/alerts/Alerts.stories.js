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
      <dx-alert class='mb-2' absolute centered type="success">¡Sus cambios se han guardado exitosamente!</dx-alert>
      <dx-alert class='mb-2' absolute bottom left type="error">Ha ocurrido un error, intente guardar nuevamente.</dx-alert>
      <dx-alert class='mb-2' absolute bottom right type="error" outlined>Ha ocurrido un error, intente guardar nuevamente.</dx-alert>
      <dx-alert class='mb-2' absolute top lef type="warning">¡Por favor revise sus cambios antes de continuar!</dx-alert>
      <dx-alert class='mb-2' absolute top right type="warning" outlined>¡Por favor revise sus cambios antes de continuar!</dx-alert>
      <dx-alert class='mb-2' type="info">Tu sesión terminará en 30 segundos por inactividad, realiza cambios en la página para mantenerte contectado</dx-alert>
      <dx-alert class='mb-2' type="info" outlined>Tu sesión terminará en 30 segundos por inactividad, realiza cambios en la página para mantenerte contectado</dx-alert>
    </div>
  `,
})
