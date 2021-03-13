<template>
  <div>
    <h3 class="mt-8 mb-4">Destinatarios:</h3>
    <perfect-scrollbar>
      <div>
        <div v-for="(item, index) in list" :key="item.id || index" :class="colclass">
          <cc-badge v-if="item.cc" />
          <dx-box bordered add-class="px-4 py-2">
            <div class="flex-fill">{{ item.name }}</div>
            <dx-icon regular color="primary" @click="removeItem(item, index)"> mdi-close </dx-icon>
          </dx-box>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'EmailDestinationList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: String,
      default: () => '200px',
    },
  },
  data: () => ({
    colclass: 'my-05 d-flex flex-fill align-center',
    ccStyle: {
      padding: '0 9px !important',
      height: 'auto !important',
    },
  }),
  methods: {
    removeItem(item, index) {
      this.$emit('onRemove', item, index)
    },
  },
}
</script>
<style scoped>
.my-05 {
  margin-bottom: 5px !important;
}
</style>
