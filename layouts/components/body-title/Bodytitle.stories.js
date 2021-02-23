export default {
  title: 'layouts/components/Bodytitle',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <div>
        <dx-bodytitle title="Estás en el Módulo de Administración" subtitle="Aquí podrás crear o modificar usuarios y revisar los documentos que se tramitan en tu Institución."></dx-bodytitle>
      </div>
    `,
})

export const Bodytitle = Template.bind({})
Bodytitle.args = {}
