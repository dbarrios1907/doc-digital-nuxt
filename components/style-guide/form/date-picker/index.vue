<template>
  <v-menu v-model="showPicker" :close-on-content-click="false" transition="slide-y-transition" offset-y min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <dx-text-field
        v-model="dateFormatted"
        :style="style"
        hide-details
        outlined
        append-icon="mdi-calendar-month-outline"
        v-bind="attrs"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" v-bind="$attrs" :header-date-format="formatHeader" v-on="$listeners">
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope" /></template>
    </v-date-picker>
  </v-menu>
</template>

<script>
import createNativeLocaleFormatter from 'vuetify/src/components/VDatePicker/util/createNativeLocaleFormatter'

export default {
  name: 'DxDatePicker',
  inheritAttrs: true,
  props: {
    cleared: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: () => null,
    },
  },
  data: vm => ({
    style: { width: 292 + 'px' },
    date: vm.parseDate(vm.value) || new Date().toISOString(),
    dateFormatted: vm.formatDate(vm.parseDate(vm.value)) || (vm.cleared ? '' : vm.formatDate(new Date().toISOString().substr(0, 10))),
    showPicker: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatHeader(date) {
      return createNativeLocaleFormatter(this.$vuetify.lang.current, {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })(date).replace(' de ', ' ')
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>

<style lang="scss">
.v-application .v-menu__content .v-picker {
  border: none !important;
}
@include theme(v-picker) using($material) {
  $font-color: map-get($material, 'font-color');
  $font-color-white: map-deep-get($material, 'colors', 'light');
  $color-primary: map-deep-get($material, 'colors', 'primary');

  border: 1px solid map-get($material, 'colors', 'primary');
  border-radius: 0;

  .v-date-picker-table {
    height: 260px;
    &.v-date-picker-table--date:before {
      position: absolute;
      height: 0;
      content: '';
      border: none;
      border-bottom: 1px solid $color-primary;
      width: calc(100% + 90px);
      top: 36px;
      left: -30px;
    }

    thead tr {
      border-bottom: 1px solid $color-primary;
    }
    th {
      color: $font-color;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 1rem;
      line-height: rem-calc(24px);
    }
    button {
      border-radius: 0 !important;
      text-decoration: underline;
    }

    .v-btn {
      color: $font-color;
    }

    .v-btn.v-btn--active {
      color: $font-color-white;
    }

    .v-btn__content {
      font-size: 1rem;
      font-weight: 400;
    }
  }

  .v-date-picker-header {
    padding: 4px;
    .v-icon {
      font-size: 3.2rem !important;
      color: $font-color;
      -webkit-text-stroke: 1px white;
    }

    .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) button:not(:hover):not(:focus) {
      color: $font-color;
    }

    .v-date-picker-header__value button {
      font-size: rem-calc(20px);
      text-transform: capitalize;
      font-weight: 400;
      color: $font-color;
    }
  }

  .v-date-picker-header__value {
    font-size: rem-calc(18px);
  }
}
</style>
