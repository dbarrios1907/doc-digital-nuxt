<template>
  <v-item-group mandatory dx-typrography>
    <v-sheet max-height="600" tile>
      <v-item v-for="[c, font, text, size, weight, spacing, margin, key] in classes" :key="key">
        <template v-slot:default="{ active, toggle }">
          <v-sheet
            :color="active ? ($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4') : undefined"
            class="px-4 pt-5 pb-3"
            tile
            style="cursor: pointer"
            @click="toggle"
          >
            <div
              :class="[`text-${c}`, `weight-${weight}`, active && `mb${margin}`]"
              class="transition-swing pb-4"
              style="display: table"
              v-text="text"
            />

            <v-expand-transition>
              <v-responsive v-if="active" max-width="350">
                <div class="d-flex justify-space-between caption">
                  <div>
                    <div class="grey--text mb-2">Font</div>

                    <div v-text="font" />
                  </div>

                  <div>
                    <div class="grey--text mb-2">Weight</div>

                    <div v-text="weight" />
                  </div>

                  <div>
                    <div class="grey--text mb-2">Size</div>

                    <div v-text="size" />
                  </div>

                  <div>
                    <div class="grey--text text-darken-1 mb-2">Letter spacing</div>

                    <div v-text="spacing" />
                  </div>
                </div>
              </v-responsive>
            </v-expand-transition>
          </v-sheet>
        </template>
      </v-item>
    </v-sheet>
  </v-item-group>
</template>

<script>
export default {
  data: () => ({
    model: null,
    classes: [
      ['h1', 'Roboto Slab', 'H1 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '49px', '400', '0', -1, 1],
      ['h2', 'Roboto', 'H2 - Lorem ipsum dolor sit amet, consectetur. Adipiscing elit.', '39px', '500', '0', 0, 2],
      ['h3', 'Roboto', 'H3 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit', '31px', '500', '0', 1, 3],
      ['h4', 'Roboto', 'H4 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '25px', '500', '0', 2, 4],
      ['h5', 'Roboto', 'H5 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '23px', '500', '0', 2, 5],
      ['h6', 'Roboto', 'H6 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '18px', '500', '0', 3, 6],
      ['body-1', 'Roboto', 'Body - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '16px', '400', '0', 4, 7],
      ['subtitle-1', 'Roboto', 'Subtitle 1 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '16px', '400', '0', 4, 8],
      ['subtitle-2', 'Roboto', 'Subtitle 2 - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '14px', '700', '0', 4, 9],
      ['caption', 'Roboto', 'Caption - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '14px', '400', '0', 4, 10],
      ['overline', 'Roboto', 'Overline - Lorem ipsum dolor sit amet, consectetur Adipiscing elit.', '14px', '700', '0', 4, 11],
    ],
  }),
}
</script>

<style lang="scss">
@include theme(v-item-group) using ($material) {
  $font-color: map-get($material, 'font-color');

  &[dx-typrography] {
    .v-sheet {
      color: $font-color;
    }
  }
}
</style>
