<template>
    <v-container class="dx-docprogress" >
        <v-row>
            <v-col class="text-center" v-for="item in items" :key="item.title">
                <div :class="['icon-container py-2', {'done' : item.done}, {'pending' : !item.done}, {'dissabled' : item.disable}]">
                    <Pending v-if="!item.done"/>
                    <div v-else-if="item.done" :class="['mx-auto', {'done-icon' : item.done && !item.disable}, {'disable-icon' : item.done && item.disable}]">
                        <dx-icon v-if="item.done && !item.disable">mdi-check</dx-icon>
                        <dx-icon v-else>mdi-minus</dx-icon>
                    </div>      
                </div>
                <div :class="['text-container font-15 line-height-20 weight-400 py-3', {'dissabled' : item.disable}]">{{item.title}}</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'DxDocprogress',
  inheritAttrs: false,
  props:{
    items:[]
  }
}
</script>

<style lang="scss">
@include theme(container) using ($material) {
    $primary-color: map-deep-get($material, 'colors', 'primary');
    $secondary-color: map-deep-get($material, 'colors', 'secondary');
    $darken3-color: map-deep-get($material, 'colors', 'darken3');
    $light-color: map-deep-get($material, 'colors', 'light');
    $darken1-color: map-deep-get($material, 'colors', 'darken1');
    .dx-docprogress{
        .col{
            padding: 0px;
        }
        .icon-container{
            height: 43px;
            width: 100%;
        }
        .text-container{
            min-height: 45px;
        }
        .done{
            background-color: $primary-color;
        }
        .pending{
            background-color: $secondary-color;
        }
        .done-icon{
            background-color: $light-color;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            .v-icon{                
                color: $primary-color !important;
                font-size: rem-calc(15px) !important;
            }
        }
        .disable-icon{
            background-color: $secondary-color;
            width: 25px;
            height: 25px;
            border-radius:50%;
            .v-icon{                
                color: $primary-color !important;
                font-size: rem-calc(15px) !important;
            }
        }
        .dissabled{
            color: $darken1-color !important;
        }
        
    }
}
</style>
