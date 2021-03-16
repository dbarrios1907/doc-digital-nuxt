<template>
  <section class="section pb-10">
    <div class="d-flex justify-end px-5 py-5">
      <dx-icon color="primary">mdi-information</dx-icon>
    </div>
    <header class="px-10 pb-4 font-20 line-height-24 primary--text">
      <slot name="header">
        LEY 21.180 * </br> Transformación Digital del Estado
      </slot>
    </header>
    <div class="section-content px-10">
      <slot name="content">
        <p class="line-height-20 font-12">
          La presente ley tiene por objeto efectuar una transformación digital del Estado, incorporando el soporte y la
          tramitación electrónica en los procedimientos administrativos del Estado y la gestión documental.
        </p>
        <dx-button small text color="primary" class="sec-btn">
          <span class="underline-text font-14">Descarga la Ley</span>
        </dx-button>
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionLawInfo',
}
</script>

<style scoped lang="scss">

.sec-btn {
  position: relative;
  left: -15px;
}

@include theme-wrap('.section') using ($material) {
  $secondary-color: map-deep-get($material, 'section', 'colors', 'secondary-light');
  background-color: $secondary-color;
}

</style>
