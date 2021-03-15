<template>
  <v-container>
    <div v-for="(item, index) of items" :key="index">
      <v-row class="header">
        <v-col class="font-14 deepdark--text weight-700 px-5 py-3">{{ item.title }}</v-col>
      </v-row>
      <v-row class="body" v-for="(body, ibody) of item.body" :key="ibody">
        <v-col>
          <v-row>
            <v-col cols="6" class="pl-5">
              <div class="font-small deepdark--text weight-700">{{ body.title }}</div>
              <div class="font-small">{{ body.description }}</div>
            </v-col>
            <v-col cols="6" class="pr-5 text-right">
              <div class="font-small d-inline-block pr-4">{{ body.status.description }}</div>
              <dx-icon>{{ body.status.name }}</dx-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
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
