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
        </perfect-scrollbar>
    </v-row>
</template>
