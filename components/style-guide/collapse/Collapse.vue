<template>
  <v-expansion-panels flat v-model="panel" :class="{ border: border }">
    <v-expansion-panel v-for="(item, index) of items" :key="index" active-class="active-collapse-item" :v-if="item.description.length > 0">
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
          <dx-button color="primary" text class="link px-0 py-0" :v-if="item.link != ''">
            <span class="pl-1 text-underline">{{ item.link }}</span>
          </dx-button>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <block-item v-if="item.name === 'block'" :items="item.description" />
        <card-item v-else-if="item.name === 'card'" :items="item.description" />
        <notify-item v-else-if="item.name === 'notify'" :items="item.description" />
        <span v-else>{{ item.description }}</span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import BlockItem from './components/BlockItem'
import CardItem from './components/CardItem'
import NotifyItem from './components/NotifyItem'
export default {
  name: 'DxCollapse',
  components: {
    BlockItem,
    CardItem,
    NotifyItem,
  },
  props: {
    items: Array,
    border: Boolean,
  },
  data() {
    return {
      panel: null,
    }
  },
  watch: {
    panel: {
      handler: function (after, before) {
        this.$emit('currentPanel', this.panel)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
@include theme(v-expansion-panels) using($material) {
  $primary-color: map-deep-get($material, 'colors', 'primary');
  $dx-collapse-border: 1.25px solid #3f87d0;

  &.border {
    border: 2px solid $primary-color;

    .v-expansion-panel {
      border: 0;
      .v-expansion-panel-header--active {
        border-bottom: none !important;
      }
    }
  }

  .v-expansion-panel-header {
    padding: rem-calc(10px) 2rem;
    min-height: rem-calc(65px);
  }

  .v-expansion-panel-header--active {
    border-bottom: 1px solid #3f87d0;
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

  .active-collapse-item .link {
    display: none;
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
