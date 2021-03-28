<template>
<div>
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <AdminDocumentsTable 
        :documentos="documentos" 
        :showselect="false" 
        title="Documentos recibidos" 
        subtitle="Aquí podrás revisar documentos que le ha recibido tu Institución." 
        empty-results="no tiene documentos recibidos" 
        documentType="recibidos" 
        inboxurl="/administracion/documentos/details/">
    </AdminDocumentsTable>
</div>
</template>

<script>
export default {
    name: 'Documentos',
    fetch() {
        this.$store.dispatch('documents/getDocumentsByInbox', 'recibir')
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
                    text: 'Recibidos',
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
