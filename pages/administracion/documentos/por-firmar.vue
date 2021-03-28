<template>
<div>
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <AdminDocumentsTable 
        :documentos="documentos" 
        :showselect="false" 
        title="Documentos por firmar" 
        subtitle="Aquí podrás revisar documentos que autoridades de tu Institución tienen pendientes por firmar." 
        empty-results="no tiene documentos por firmar" 
        documentType="por firmar" 
        inboxurl="/administracion/documentos/details/">
    </AdminDocumentsTable>
</div>
</template>

<script>
export default {
    name: 'Documentos',
    fetch() {
        this.$store.dispatch('documents/getDocumentsByInbox', 'firmar')
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
                    text: 'Por firmar',
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
