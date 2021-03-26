<template>
  <keep-alive>
    <div v-if="notEmpty">
      <h3 class="mt-8 mb-4">Destinatarios:</h3>
      <perfect-scrollbar>
        <div>
          <div v-for="(item, index) in list" :key="item.id || index" :class="colclass">
            <cc-badge v-if="item.cc" />
            <dx-box bordered add-class="px-4 py-2">
              <div class="flex-fill">{{ item[displayProp] }}</div>
              <dx-icon regular color="primary" @click="removeItem(item, index)"> mdi-close </dx-icon>
            </dx-box>
          </div>
        </div>
      </perfect-scrollbar>
      <v-row no-gutters class="mt-4">
        <email-saved-list-modal />
      </v-row>
    </div>
  </keep-alive>
</template>

<script>
import EmailSavedListModal from '../SaveListModal'
export default {
  name: 'EmailDestinationList',
  components: {
    EmailSavedListModal,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: String,
      default: () => '200px',
    },
    displayProp: {
      type: String,
      default: 'email',
    },
  },
  data: () => ({
    colclass: 'my-05 d-flex flex-fill align-center',
    ccStyle: {
      padding: '0 9px !important',
      height: 'auto !important',
    },
  }),
  computed: {
    notEmpty() {
      return this.list?.length > 0
    },
  },
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
