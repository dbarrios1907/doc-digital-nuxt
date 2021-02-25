import './Modal.scss'
import Button from '../button/Button.vue'

export default {
  title: 'Style Guide/Modal',
  argTypes: {},
}

const labelCol = {
  template: `
    <v-col cols="auto" style="min-width: 140px; max-width: 140px" class="flex font-20 line-height-22"><slot /></v-col>
  `,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    labelCol,
  },
  data: () => ({
    dialog: false,
    dialog1: false,
    dialog2: false,
    switch1: true,
    value: ['Administrador'],
    items: ['Administrador', 'otro'],
    items1: ['Subragante 1', 'Subragante 2'],
    items2: ['Miguel', 'Juan'],
    labelClass: 'text-body-1 font-20',
  }),
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
  },
  methods: {
    removeItem(item) {
      this.value = this.value.filter(function (val) {
        return item !== val
      })
    },
  },
  template: `
    <v-row justify="center">
      <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2" @click="dialog = true">
        <span class="text-underline"> Open Dialog 1 </span>
      </dx-button>
      <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2" @click="dialog1 = true">
        <span class="text-underline"> Open Diaglog 2 </span>
      </dx-button>
      <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2" @click="dialog2 = true">
        <span class="text-underline"> Open Dialog 3 </span>
      </dx-button>

      <v-dialog
          overlay-opacity="0.55"
          overlay-color="#001C41"
          v-model="dialog"
          max-width="600px"
          :content-class="ismobil"
          >
        <v-card>
          <v-card-title>
            <h5 class="font-title weight-700 darken3--text">
              Cerrar sesión
            </h5>
          </v-card-title>
          <v-divider class="darken1"></v-divider>

          <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text">
              Has cerrado tu sesión.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <dx-button color="primary" outlined v-bind="$props" class="text-none">
              <span class="text-underline"> Ir a DocDigital </span>
            </dx-button>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          overlay-opacity="0.55"
          overlay-color="#001C41"
          v-model="dialog1"
          max-width="600px"
          :content-class="ismobil">
        <v-card>
          <v-card-title>
            <h5 class="font-title weight-700 darken3--text font-roboto">
              Su sesión ha expirado
            </h5>

            <v-spacer></v-spacer>
            <v-btn
                color="darken3"
                icon
                @click="dialog1 = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols=1 :class="ismobil ? 'px-0' : ''">
                <v-icon color="primary">mdi-clock-time-five-outline</v-icon>
              </v-col>
              <v-col cols=11 class="px-0 pt-2 pl-1 pr-ext">
                <span class="weight-400 font-roboto font-title line-height-30 darken3--text">
                  Por su seguridad, su sesión ha expirado luego de <b class="weight-700">30 minutos de inactividad</b>. Si estaba ingresando un nuevo documento, se ha guardado como borrador.
                </span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <dx-button color="primary" outlined v-bind="$props" class="text-none">
              <span class="text-underline"> Ir a DocDigital </span>
            </dx-button>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          overlay-opacity="0.55"
          overlay-color="#001C41"
          v-model="dialog2"
          max-width="700px"
          :content-class="ismobil">
        <v-card>
          <v-card-title>
            <h5 class="font-title weight-700 darken3--text font-roboto">
              Nuevo usuario
            </h5>

            <v-spacer></v-spacer>
            <v-btn
                icon
                color="darken3"
                @click="dialog2 = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="formext">
            <perfect-scrollbar :style="{ height: '100%' }">
              <div class="px-3">
                <v-row class="align-center">
                  <labelCol>RUT*</labelCol>
                  <v-col>
                    <dx-text-field
                      class="d-inline-block"
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="99.999.999"
                      style="width: 108px"
                    /> -
                    <dx-text-field
                      class="d-inline-block"
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="K"
                      style="width: 37px"
                    />
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Nombre(s)*</labelCol>
                  <v-col>
                    <v-text-field
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="Nombre Nombre"
                    />
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Apellido(s)*</labelCol>
                  <v-col>
                    <v-text-field
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="Apellido Apellido  "
                    />
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Correo*</labelCol>
                  <v-col>
                    <v-text-field
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="Escribe el correo institucional"
                    />
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Cargo*</labelCol>
                  <v-col>
                    <v-text-field
                      hide-details
                      ref="name"
                      solo
                      flat
                      outlined
                      placeholder="Escribe el cargo"
                    />
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Permisos Adicionales</labelCol>
                  <v-col>
                    <dx-select
                        :ripple="false"
                        v-bind="$props"
                        v-model="value"
                        :items="items"
                        chips
                        label="Multi Selección"
                        persistent-hint
                        multiple
                        persistent-hint
                        flat
                        hide-details
                        outlined
                        :menu-props="{ bottom: true, offsetY: true, openOnClick:false }"
                    >
                      <template v-slot:selection="{ item, index }">
                        <Badge type="tertiary" label outlined class="ma-0">
                          <div class="darken3--text font-16 line-height-22 weight-400">{{item}}</div>
                          <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)">  mdi-close </dx-icon>
                        </Badge>
                      </template>
                    </dx-select>
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Subrogante</labelCol>
                  <v-col>
                    <dx-select
                        :items="items1"
                        label="Selecciona subrogante"
                        solo
                        flat
                        outlined
                        v-bind="$props"
                        ripple="true"
                        hide-details
                        append-icon=""
                    ></dx-select>
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <v-col cols="auto" class="flex font-20">Activar subrogancia</v-col>
                  <v-col>
                    <doc-switch
                      class="d-inline-block"
                      style="width: 40px"
                      v-model="switch1"
                          inset
                          :ripple="false"
                          dense
                      >
                      </doc-switch>
                      <v-icon color="warning">mdi-help-circle</v-icon>
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <labelCol>Seguidor</labelCol>
                  <v-col>
                    <dx-select
                        :items="items2"
                        label="Selecciona seguidor"
                        solo
                        flat
                        outlined
                        v-bind="$props"
                        ripple="true"
                        hide-details
                        append-icon=""
                    ></dx-select>
                  </v-col>
                </v-row>
              </div>
            </perfect-scrollbar>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="pr-2">
              <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2">
                <span class="text-underline"> Cancelar </span>
              </dx-button>

              <dx-button color="white" outlined v-bind="$props" class="text-none primary">
                <span class="text-underline"> Agregar </span>
              </dx-button>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
  `,
})

export const Default = Template.bind({})
Default.args = {}
