<template>
<div>
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <AdminDocumentsTable 
        :documentos="documentos" 
        :showselect="false" 
        title="Documentos enviados" 
        subtitle="Aquí podrás revisar documentos que se han enviado a otras Instituciones." 
        empty-results="no tiene documentos enviados" 
        documentType="enviados" 
        inboxurl="/administracion/documentos/details/">
    </AdminDocumentsTable>
</div>
</template>

<script>
export default {
    name: 'Documentos',
    fetch() {
        this.$store.dispatch('documents/getDocumentsByInbox', 'enviar')
    },
    data() {
        return {
            currentroute: '',
            title: '',
            subtitle: '',
            breadcrums: [{
                    text: 'Administración',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Documentos',
                    disabled: false,
                    href: '#',
                },                
                {
                    text: 'Enviados',
                    disabled: true,
                    href: '#',
                },
            ],
        }
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs
        },
        documentos() {
            return this.$store.getters['documents/getDocs']
        },
    },
}
</script>
