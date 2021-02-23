<template>
  <div class="wrapper d-flex" :style="{ border: `2px solid ${primary}` }">
    <div class="svg"><slot name="header">header icon</slot></div>
    <h2 class="font-roboto line-height-30 text-center weight-400"><slot name="body">body text</slot></h2>
    <div class="rectangle d-flex" :style="{ 'background-color': `${primary}` }">
      <doc-digital-icon color="white" class="my-auto ml-auto" />
      <a
        :href="href"
        :style="{ 'border-left': `2px solid ${_color}`, color: _color }"
        class="d-flex align-center ml-2 pl-2 line-height-16 font-nunito font-regular weight-300 my-auto mx-auto"
      >
        <slot name="footer">link text</slot>
      </a>
    </div>
  </div>
</template>
<script>
import { colorMixin } from '@/shared/mixins/colorMixin'
export default {
  name: 'DocUploadCard',
  mixins: [colorMixin],
  props: {
    href: String,
    primary: {
      Type: String,
      default: '#0F69C4',
    },
    color: {
      Type: String,
      default: 'white',
    },
  },
}
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 377px;
  height: 246px;
  margin-top: 45px;
}

.wrapper .svg {
  position: absolute;
  top: -48px;
  left: 138px;
}

.wrapper h2 {
  width: 337.52px;
  margin: 70px auto;
}

.rectangle {
  position: absolute;
  width: 376px;
  height: 89px;
  bottom: -1px;
  left: -1px;
}

.rectangle > a {
  width: 100px;
  height: 40px;
}
</style>
