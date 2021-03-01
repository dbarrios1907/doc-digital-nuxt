import './UserForm.scss'

export default {
  title: 'Style Guide/UserForm',
  argTypes: {},
}

const labelCol = {
  template: `
    <v-col cols="auto" style="min-width: 140px; max-width: 140px" class="flex font-20 line-height-22 py-1"><slot /></v-col>
  `,
}
const customCol = {
  template: `
    <v-col cols="5" style="max-height: 72px; float:left;"><slot /></v-col>
  `,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    labelCol,
    customCol,
  },
  data: () => ({
    switch1: true,
    value: ['Administrador'],
    items: ['Administrador', 'otro'],
    items1: ['Subragante 1', 'Subragante 2'],
    items2: ['Miguel', 'Juan'],
    labelClass: 'text-body-1 font-20',
    user : {
      rut: null,
      rut_dv: null,
      name: null,
      lastname:null,
      email:null,
      cargo:null,
    },
    formHasErrors: false,
    breadcrumbs: [
      {
        text: 'Administración',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Usuarios',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Nuevo Usuario',
        disabled: true,
        href: '',
      },
    ],
  }),
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    form() {
      return {
        rut: this.user.rut,
        rut_dv: this.user.rut_dv,
        name: this.user.name,
        lastname: this.user.lastname,
        email: this.user.email,
        cargo: this.user.cargo,
      }
    },
  },
  methods: {
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
  template:   
  `<v-row class="px-9">
      <perfect-scrollbar :style="{ height: '100%' }">
        <v-col cols="12" class="d-none d-md-flex d-lg-flex d-xl-flex">
          <dx-breadcrumbs :items="breadcrumbs" />
        </v-col>
        <v-col cols="12" class="mt-6 d-none d-md-flex d-lg-flex d-xl-flex">
          <dx-bodytitle >
            <template v-slot:title>
              <div class="weight-700 text-md-h4 line-height-31">Nuevo Usuario</div>
            </template>
          </dx-bodytitle>
        </v-col>  
        <v-col cols="12">
          <div class="weight-400 line-height-30 font-16">Complete el formulario para crear un nuevo usuario.</div>
        </v-col>  
        
        <div class="mt-3" ref="form">
                <v-col cols="12">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>RUT*</labelCol>
                    <v-col>
                      <dx-text-field
                        class="d-inline-block"
                        ref="rut"
                        v-model="user.rut"
                        solo
                        flat
                        outlined
                        placeholder="99.999.999"
                        style="width: 108px"
                        :rules="[() => (!!user.rut || !!user.rut_dv) || 'Campo requerido']"
                        required
                      /> -
                      <dx-text-field
                        class="d-inline-block"
                        ref="rut_dv"
                        v-model="user.rut_dv"
                        solo
                        flat
                        outlined
                        placeholder="K"
                        style="width: 37px"                      
                        required
                      />
                    </v-col>
                  </v-row>
                </v-col>

                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Nombre(s)*</labelCol>
                    <v-col>
                      <v-text-field
                        ref="name"
                        v-model="user.name"
                        solo
                        flat
                        outlined
                        :rules="[() => !!user.name || 'Campo requerido']"
                        label="Nombre Nombre"
                        required
                      />
                    </v-col>
                  </v-row>
                </customCol>

                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Apellido(s)*</labelCol>
                    <v-col>
                      <v-text-field
                        ref="lastname"
                        v-model="user.lastname"
                        solo
                        flat
                        outlined
                        placeholder="Apellido Apellido  "
                        :rules="[() => !!user.lastname  || 'Campo requerido']"
                        required
                      />
                    </v-col>
                  </v-row>
                </customCol>

                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Correo*</labelCol>
                    <v-col>
                      <v-text-field
                        ref="email"
                        v-model="user.email"
                        solo
                        flat
                        outlined
                        placeholder="Escribe el correo institucional"
                        :rules="[ 
                          () => !!user.email  || 'Campo requerido',
                          () => !user.email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email) || 'Email inválido'
                        ]"
                        required
                      />
                    </v-col>
                  </v-row>
                </customCol>

                <customCol class="d-none d-md-flex d-lg-flex d-xl-flex" style="min-height: 72px;"> </customCol>

                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol style="margin-top: -28px;">Entidad*</labelCol>
                    <v-col>
                      <dx-select
                          :items="items"
                          label="Seleccione entidad"
                          v-bind="$props"
                          closableItems
                      > </dx-select>
                    </v-col>
                  </v-row>
                </customCol>
                
                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Cargo*</labelCol>
                    <v-col>
                      <v-text-field
                        ref="name"
                        v-model="user.cargo"
                        solo
                        flat
                        outlined
                        placeholder="Escribe el cargo"
                        :rules="[() => !!user.cargo  || 'Campo requerido']"
                      />
                    </v-col>
                  </v-row>
                </customCol>

                <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol :class="[{'mt-minus-28': !ismobil}]">
                      Permisos
                      <v-icon color="warning">mdi-help-circle</v-icon>
                    </labelCol>
                    <v-col>
                      <dx-select
                          :items="items"
                          label="Seleccione permisos"
                          multiple
                          v-bind="$props"
                          closableItems
                      >
                      </dx-select>
                    </v-col>
                  </v-row>
                  </customCol>
                  <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Seguidor</labelCol>
                    <v-col>
                      <dx-select
                          :items="items2"
                          label="Seleccione seguidor"
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
                </customCol>
                  <customCol :class="ismobil">
                  <v-row :class="['align-center', ismobil]">
                    <labelCol>Subrogante</labelCol>
                    <v-col>
                      <dx-select
                          :items="items1"
                          label="Seleccione subrogante"
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
                  </customCol>
    
                  <customCol :class="ismobil">
                  <v-row :class="[{'align-center': ismobil}]" style="max-height:72px">
                    <v-col cols="auto" class="flex font-20 mt-2" sryle="height: 100%">Activar subrogancia</v-col>
                    <v-col style="max-height:72px">
                      <doc-switch
                        class="d-inline-block mt-0 pt-0"
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
                  </customCol>
            <div :class="['pr-2', {'align-center': ismobil == 'ismobil'}, {'align-right': ismobil == ''}, 'mt-12']">
                <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2">
                  <span class="text-underline"> Cancelar </span>
                </dx-button>

                <dx-button color="white" outlined v-bind="$props" class="text-none primary"  @click="submit">
                  <span class="text-underline"> Crear nuevo usuario </span>
                </dx-button>
            </div>
        </div>
      </perfect-scrollbar>
    </v-row>
  `,
})

export const Default = Template.bind({})
Default.args = {}
