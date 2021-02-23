<template>
  <ValidationProvider v-slot="v" :name="name" :rules="rules">
    <v-text-field label="Text Label" outlined dense v-bind="$attrs" v-on="$listeners">
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
          </template>
          I'm a tooltip
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-slide-x-reverse-transition mode="out-in">
          <v-icon
            :key="`icon-${isEditing}`"
            :color="isEditing ? 'success' : 'info'"
            @click="log(v)"
            v-text="isEditing ? 'mdi-check' : 'mdi-circle-edit-outline'"
          />
        </v-slide-x-reverse-transition>
      </template>
    </v-text-field>
    <!--    <span>{{ errors[0] }}</span>-->
  </ValidationProvider>
</template>

<script>
export default {
  name: 'DocTextField',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
    },
    rules: {
      type: String,
    },
  },
  data() {
    return {
      isEditing: false,
      isLoading: false,
    }
  },
  methods: {
    log(v) {
      console.log(v)
    },
  },
}
</script>
<style lang="scss">
@include theme(v-text-field) using ($material) {
  &--outlined {
    &:not(.v-input--is-focused) {
      &:not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
        color: map-deep-get($material, 'colors', 'darken3') !important;
      }
    }
  }
}
</style>
