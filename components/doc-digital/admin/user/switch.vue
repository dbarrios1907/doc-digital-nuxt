<template>
<v-row no-gutters class="switch_subrrogancia pl-4 pr-2" >
    <v-col>
        <div class="weight-400 font-16 subrogancia-label">{{title}}</div>
    </v-col>
    <v-col class="align-right">
        <v-switch class="d-inline-block mt-0 pt-0 success-switch" @change="switcht_input" style="width: 40px"  v-model="subrogancia" inset :ripple="false" dense />
    </v-col>
</v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            subrogancia: false
        }
    }, 
    methods:{
        async switcht_input(){
            await this.$store.dispatch('usuarios/setSubrogancia', {id: this.userId, status: this.subrogancia})
        }
    },
    computed:{
        ...mapGetters(['userId', 'isSubroganteActivado']),
        title(){
            this.subrogancia = this.isSubroganteActivado
            return 'Activar subrogancia'
        }
    }
}
</script>
<style lang="scss" scoped>
@include theme(v-application) using($material) {
    $primarycolor: map-get($material, 'primary');
    $text-color: map-get($material, 'light');
    .switch_subrrogancia{
        height: 48px;
        background-color: $primarycolor;
        // position: absolute;
        // bottom: 148px;
        // width: 100%;
        
        .subrogancia-label{
            line-height: 3rem;
            color: $text-color;
        }
    }
}

</style>
