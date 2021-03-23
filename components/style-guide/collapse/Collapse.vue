<template>
  <v-expansion-panels flat v-model="panel">
    <v-expansion-panel v-for="(item, index) of items" :key="index" active-class="active-collapse-item">
      <v-expansion-panel-header v-if="item.disabled" class="v-expansion-panel-header__disabled" disable-icon-rotate>
        <div class="font-title weight-700">
          {{ item.title }}
        </div>
        <template v-slot:actions>
          <v-icon class="pr-1" style="font-size: 30px"> mdi-minus-circle-outline </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-header v-else>
        <div class="font-title weight-700">
          {{ item.title }}
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <block-item v-if="item.name === 'block'" :item="item.description" />
        <card-item v-else-if="item.name === 'card'" :items="item.description" />
        <span v-else>{{ item.description }}</span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import BlockItem from './components/BlockItem'
import CardItem from './components/CardItem'
export default {
  name: 'DxCollapse',
  components: {
    BlockItem,
    CardItem,
  },
  props: {
    items: Array,
  },
  data(){
    return {
      panel: null,
    }
  },
  watch:{
    'panel': {
        handler: function (after, before) {
           this.$emit('currentPanel', this.panel)   
        },
        deep: true
    }
  }
}
</script>

<style lang="scss">
@include theme(v-expansion-panels) using($material) {
  $dx-collapse-border: 1.25px solid #3f87d0;

  .v-expansion-panel-header {
    padding: rem-calc(10px) 2rem;
    min-height: rem-calc(65px);
  }

  .v-expansion-panel-header--active {
    border-bottom: 1px solid #3f87d0 !important;
  }
  .v-expansion-panel-content__wrap {
    padding: 20px 35px !important;
  }

  .v-expansion-panel-header__disabled {
    background: rgba(55, 55, 55, 0.2);
    opacity: 0.5;
    pointer-events: none;
  }

  .v-expansion-panel--active:not(:first-child),
  .v-expansion-panel--active + .v-expansion-panel {
    margin-top: 0;
  }

  .v-expansion-panel {
    border-bottom: $dx-collapse-border;
  }

  .v-expansion-panel-header__icon {
    .v-icon {
      font-size: $expansion-panel-header-icon-font-size;
    }
  }
}
</style>
