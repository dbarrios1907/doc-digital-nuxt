import { storyPath } from './_settings'

export default {
  title: storyPath,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      items: [
        /*{ 
            name: 'Visar',
            count: 22
          },
          { 
            name: 'Firmar',
            count: 4
          },
          { 
            name: 'Recibir',
            count: 8
          }*/
      ],
    }
  },
  template: `
    <dx-main-layout>
        <template v-slot:header>
            <Header />
        </template>

        <template v-slot:main>
            <div style="width: 100%; grid-column:2; padding: 0 48px;" class="d-flex text-center"><dx-bodytitle title="Hola Trinidad, ¡Ya estás en DocDigital!"></dx-bodytitle></div>
                <dx-pendingdocs :items="items" class="mx-auto mt-10" style="width: fit-content"></dx-pendingdocs>
                <div class="mt-12 mb-6">
                    <h2 class="text-center">¿Por dónde quieres comenzar?</h2>
                    <div class="font-size-16 line-height-24 weight-400 font-roboto text-center">Dirígete a la sección correcta según lo que necesites realizar.</div>
                </div>
                <div class="text-center mb-8">
                    <doc-upload-card class="d-inline-flex">
                        <template v-slot:header>
                            <doc-sign-icon fill="white" color="primary" />
                        </template>

                        <template v-slot:body>
                            Sube un documento y envíalo para firmar
                        </template>

                        <template v-slot:footer>
                            FIRMADOR
                        </template>
                    </doc-upload-card>

                    <doc-upload-card class="d-inline-flex ml-2">
                        <template v-slot:header>
                            <doc-signed-icon fill="white" color="primary" />
                        </template>

                        <template v-slot:body>
                            Sube un documento firmado y envíalo para su distribución
                        </template>

                        <template v-slot:footer>
                            DESPACHADOR
                        </template>
                    </doc-upload-card> 
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <Footer />
        </template>
    </dx-main-layout>
  `,
})

export const HomeNextAuth = Template.bind({})
HomeNextAuth.args = {}
