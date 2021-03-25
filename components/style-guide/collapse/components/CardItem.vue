<template>
<div class="mx-0">
    <div v-for="(item, index) of items" :key="index">
        <v-row class="header" no-gutters>
            <v-col class="font-14 deepdark--text weight-700 px-5 py-3">{{ item.title }}</v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="6" class="pl-5">
                <div class="font-small deepdark--text weight-700">{{ item.body.title }}</div>
                <div class="font-small">{{ item.body.description }}</div>
            </v-col>
            <v-col cols="6" class="pr-5 text-right">
                <div class="font-small d-inline-block pr-4">{{ item.body.status.description }}</div>
                <dx-icon>{{ item.body.status.name }}</dx-icon>
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
export default {
    name: 'CardItem',
    props: {
        items: Array,
    },
}
</script>

<style lang="scss">
@include theme(row) using($material) {
    &.header {
        background-color: #dddddd;
        border-top-left-radius: rem-calc(5px);
        border-top-right-radius: rem-calc(5px);
    }

    &.body {
        box-sizing: border-box;
        border: 1px solid #dddddd;
        border-bottom-left-radius: rem-calc(5px);
        border-bottom-right-radius: rem-calc(5px);
    }
}
</style>
