<template>
  <!-- <v-expansion-panels flat>
    <v-expansion-panel v-for="(item, index) of items" :key="index" active-class="active-collapse-item">
      <v-expansion-panel-header>
        <div class="font-title weight-700">
          {{ item.title }}
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        {{ item.description }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> -->
  <div>
    <div v-if="!items.length">
      <div class="dx-alert d-flex justify-content-center elevation-3 dx-type__success height-90">
        <div class="dx-alert__wrapper d-inline-flex align-center py-3">
          <span class="d-flex px-5">
            <AlertSuccessIcon />
          </span>
          <div class="dx-alert__content font-large d-inline flex-fill pr-12">
            <div class="vn-message font-20">No tienes documentos pendientes</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="items.length" class="main-container">
      <div class="col-3">Tus Pendientes</div>
      <div v-for="(item, index) in items" :key="index" :ripple="false" class="card-documents">
        <span class="card-title">{{ item.name }}</span>
        <div class="card-number">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import './Pendingdocs.scss'
export default {
  name: 'DxPendingdocs',
  inheritAttrs: false,
  props: {
    items: Array,
  },
}
</script>

<style scoped>
.height-90 {
  height: 90px;
}
.main-container {
  width: 755px;
  height: 120px;
  background-color: #e5f0fa;
  padding: 29px 58px;
  display: table;
}
.col-3,
.card-documents {
  float: left;
  line-height: 37px;
  display: table-cell;
  vertical-align: middle;
}

.card-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
}

div.card-number {
  border-radius: 50%;
  height: 32px;
  width: 32px;
  float: right;
  font-size: 16px;
  line-height: 24px;
  background-color: #ffffff;
  color: #0f69c4;
  padding: 5px;
  text-align: center;
  margin-top: 2px;
}
.card-documents {
  background-color: #0f69c4;
  color: #ffffff;
  margin: 0px 10px;
  float: left;
  width: 21%;
  min-width: 139px;
  height: 58px;
  padding: 10px 18px;
}
</style>
