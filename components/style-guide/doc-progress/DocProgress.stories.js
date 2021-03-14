export default {
    title: 'Style Guide/DocProgress',
    argTypes: {
    },
  }
  
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data(){
        return {
            items:[
                {
                    title: '1. Inicio de la tramitación',
                    done: true,
                    disable: false,
        
                },            
                {
                    title: '2. Visación (no requiere)',
                    done: false,
                    disable: true,
        
                },            
                {
                    title: '3. Firma',
                    done: false,
                    disable: false,
        
                },            
                {
                    title: '4. Folio y despacho',
                    done: false,
                    disable: false,
        
                },            
                {
                    title: '5. Destinatarios',
                    done: false,
                    disable: false,
        
                }
            ]
        }
    },
    template: `
      <dx-docprogress :items="items"/>
    `,
})

export const Default = Template.bind({})
Default.args = {}