<template>
  <v-expansion-panels flat v-model="panel" :class="{ border: border && items.length > 0 }">
    <v-expansion-panel v-for="(item, index) of items" :key="index" active-class="active-collapse-item" :v-if="item.description">
      <v-expansion-panel-header v-if="items.length == 0" class="v-expansion-panel-header__disabled" disable-icon-rotate>
        <div class="header--title">
          {{ item.title }}
        </div>
        <template v-slot:actions>
          <v-icon class="pr-1" style="font-size: 30px"> mdi-minus-circle-outline </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-header v-else>
        <div class="header--title" v-if="item.link">
          <v-icon color="primary" style="font-size: 32px">mdi-bell-outline</v-icon>
          {{ item.title }}
          <dx-button color="darken3" text class="link px-0 py-0 weight-700">
            -<span class="pl-1 text-underline">{{ item.link }}</span>
          </dx-button>
        </div>
        <div class="header--title" v-else>{{ item.title }}</div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <block-item v-if="item.name === 'block'" :items="item.description" />
        <sign-item v-else-if="item.name === 'sign'" :items="item.description" />
        <notify-item v-else-if="item.name === 'notify'" :items="item.description" />
        <folio-item v-else-if="item.name === 'folio'" :items="item.description" />
        <destinatarios-item v-else-if="item.name === 'destinatarios'" :items="item.description" />
        <span v-else>{{ item.description }}</span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import BlockItem from './components/BlockItem'
import SignItem from './components/SignItem'
import NotifyItem from './components/NotifyItem'
import FolioItem from './components/FolioItem'
import DestinatariosItem from './components/DestinatariosItem'

export default {
  name: 'DxCollapse',
  components: {
    BlockItem,
    SignItem,
    NotifyItem,
    FolioItem,
    DestinatariosItem,
  },
  props: {
    items: { type: Array, default: () => [] },
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
  $darken3-color: map-deep-get($material, 'colors', 'darken3');
  $dx-collapse-border: 1.25px solid #3f87d0;

  &.border {
    border: 2px solid $primary-color;

    .v-expansion-panel {
      border: 0;

      .v-expansion-panel-header {
        .header--title {
          font-size: 18px;
          font-weight: 400;
          color: $darken3-color;
        }
      }
      .v-expansion-panel-header--active {
        border-bottom: none !important;
      }
    }
  }

  .v-expansion-panel-header {
    padding: rem-calc(10px) 2rem;
    min-height: rem-calc(65px);

    .header--title {
      font-size: 20px;
      font-weight: 700;
      color: #5c5c5c;
    }
  }

  .v-expansion-panel-header--active {
    border-bottom: rem-calc(1px) solid #3f87d0;
  }

  .v-expansion-panel-content__wrap {
    padding: rem-calc(20px) rem-calc(35px) !important;
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
