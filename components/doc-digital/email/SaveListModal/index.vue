<template>
  <dx-dialog v-model="showDialog" persistent max-width="590" v-bind="$attrs" v-on="$listeners">
    <template v-slot:activator="{ on, attrs }">
      <dx-button color="darken3" text v-bind="attrs" v-on="on">
        <dx-icon left regular> mdi-content-save</dx-icon>
        <span class="text-underline">
          <span class="underline-text">Guardar lista</span>
        </span>
      </dx-button>
    </template>
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text font-roboto">Guardar lista</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click="onCancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row no-gutters>
          <v-col>
            <p class="my-2 pb-4 font-16 line-height-24">
              Guarda esta lista de distribución para seleccionarla rápidamente para otro documento en el futuro.
            </p>
          </v-col>

          <v-col cols="12" class="pr-sm-2">
            <label>Nombre de la lista</label>
            <dx-text-field
              v-model="listName"
              solo
              flat
              outlined
              :rules="[() => !!listName || 'Campo requerido']"
              label="Escriba el nombre de la lista"
              class="mb-0"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <dx-button color="primary" outlined @click="onCancel">
          <dx-icon left regular> mdi-close</dx-icon>
          <span class="text-underline">
            <span class="underline-text">Cancelar</span>
          </span>
        </dx-button>

        <dx-button color="primary" @click="onSave">
          <dx-icon left regular> mdi-content-save</dx-icon>
          <span class="text-underline">
            <span class="underline-text">Guardar lista</span>
          </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </dx-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      listName: undefined,
    }
  },
  methods: {
    onCancel() {
      this.showDialog = false
    },
    onSave() {
      this.$emit('onSave', this.listName)
    },
  },
}
</script>
