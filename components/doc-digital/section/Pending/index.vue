<template>
  <section class="section py-5 px-4">
    <div class="d-flex justify-center">
      <p>Tus pendientes</p>
    </div>
    <div class="d-flex justify-center">
      <dx-button color="primary">
        Visar
        <div class="badge-number d-flex justify-center">
          <span>{{ visar }}</span>
        </div>
      </dx-button>
      <dx-button color="primary">
        Firmar
        <div class="badge-number d-flex justify-center">
          <span>{{ firmar }}</span>
        </div>
      </dx-button>
      <dx-button color="primary">
        Recibir
        <div class="badge-number d-flex justify-center">
          <span>{{ recibir }}</span>
        </div>
      </dx-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionPending',
  props: {
    visar: Number,
    firmar: Number,
    recibir: Number,
  },
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

  button {
    margin: 5px;
  }
}

@include theme-wrap('.badge-number') using ($material) {
  $primary-color: map-deep-get($material, 'colors', 'primary');
  $light-color: map-deep-get($material, 'colors', 'light');
  border-radius: 50px;
  color: $primary-color;
  background-color: $light-color;
  font-size: 12.8px;
  padding: 1px 4px;
  line-height: 14px;
  margin-left: 8px;
  max-height: 16px;
  span {
    position: relative;
    left: -1px;
  }
}
</style>
