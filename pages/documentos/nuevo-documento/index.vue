<template>
    <v-row>
        <perfect-scrollbar :style="{ height: '100%', width: '100%' }">
            <v-col cols="12" class="mt-3 mb-7 d-none d-md-flex d-lg-flex d-xl-flex">
                <dx-bodytitle >
                <template v-slot:title>
                    <div class="weight-700 font-title line-height-29">Nuevo documento a distribuir</div>
                </template>
                <template v-slot:subtitle>
                    <p class="weight-400 mt-3 font-regular line-height-24">
                    Complete los campos solicitados para ingresar un nuevo documento a distribuir. <br>
                    (*) campos obligatorios.</p>
                </template>
                </dx-bodytitle>
            </v-col>
            <v-col cols=12>
             <dx-stepper v-model="e1">
                <v-stepper-header>
                <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                >
                    1. Documento
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                >
                    2. Destinatarios
                </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card height="200px">
                        
                    </v-card>
                    <div class="next">
                    <dx-button color="white" small text @click="e1 = 2">
                        <span class="underline-text">Siguiente</span>
                        <dx-icon right chevron>
                            mdi-arrow-right
                        </dx-icon>
                    </dx-button>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-card height="200px">
                        
                    </v-card>
                    <div class="next">
                    <dx-button color="white" text @click="e1 = 3" small>
                        <span class="underline-text">Siguiente</span>
                        <dx-icon right chevron>
                            mdi-arrow-right
                        </dx-icon>
                    </dx-button>
                    </div>
                </v-stepper-content>
                </v-stepper-items>
            </dx-stepper>
            </v-col>
        </perfect-scrollbar>
    </v-row>
</template>
<script>
  export default {
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>
