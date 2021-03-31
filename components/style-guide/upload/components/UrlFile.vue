<template>
  <li v-if="file" tabindex="0" class="dx-list__item">
    <div class="dx-item__top d-flex align-center select-text flex-shrink-0">
      <div class="dx-item__start py-2 px-4 mr-3 rounded-pill secondary primary--text">{{ fileType }}</div>

      <div class="dx-item__body text-truncate" :title="file[nameProp]" style="min-width: 0; width: 100%">
        {{ _description }}
      </div>

      <div class="d-flex dx-item__end">
        <dx-icon class="pointer" right color="primary" medium @click="onRemove"> mdi-trash-can-outline </dx-icon>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'UrlFile',
  props: {
    file: {
      type: Object,
      default: () => ({}),
    },
    fileType: {
      type: String,
      default: 'URL',
    },
    nameProp: {
      type: String,
      default: 'url',
    },
    descriptionProp: {
      type: String,
      default: 'description',
    },
    idProp: {
      type: String,
      default: 'url',
    },
  },
  computed: {
    _description() {
      return this.file[this.descriptionProp] || this.file[this.nameProp]
    },
  },
  methods: {
    onRemove() {
      this.$emit('onRemove', this.file)
    },
  },
}
</script>

<style scoped lang="scss">
.dx-list__item {
  list-style: none;
  //flex-shrink: 0;
  .dx-item__body {
    color: black;
  }
  float: none;

  .dx-item__start {
    line-height: normal;
    float: left;
  }
  .dx-item__end {
    float: right;
  }
  .dx-item__bottom {
    clear: both;
  }
}
</style>
