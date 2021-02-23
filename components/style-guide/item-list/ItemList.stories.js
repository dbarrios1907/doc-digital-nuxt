import Vue from 'vue'

export default {
  title: 'Style Guide/ItemList',
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const wrapper = {
  template: `
    <v-row>
      <v-col cols="12" sm="6" lg="5">
        <v-card>
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  `,
}

Vue.component('wrapper', wrapper)

const listData = {
  selected: [2],
  items: [
    {
      action: '15 min',
      headline: 'Javier Dalila Saldaña',
      subtitle: `Entidad Test 2020`,
      title: 'Lista 1 de visación',
    },
    {
      action: '2 hr',
      headline: 'Javier Dalila Saldaña',
      subtitle: `Entidad Test 2020`,
      title: 'Lista 1 de visación',
    },
    {
      action: '6 hr',
      headline: 'Javier Dalila Saldaña',
      subtitle: `Entidad Test 2020`,
      title: 'Lista 1 de visación',
    },
    {
      action: '12 hr',
      headline: 'Javier Dalila Saldaña',
      subtitle: `Entidad Test 2020`,
      title: 'Lista 1 de visación',
    },
    {
      action: '18hr',
      headline: 'Javier Dalila Saldaña',
      subtitle: `Entidad Test 2020`,
      title: 'Lista 1 de visación',
    },
  ],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => listData,
  template: `
    <wrapper>
    <v-list three-line flat >
      <v-list-item-group
          :ripple="false"
          v-model="selected"
      >
        <template v-for="(item, index) in items">
          <v-list-item class="py-2" :key="item.title" :ripple="false">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title class="font-title weight-700 pb-3" v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                    color="primary"
                >
                  mdi-trash-can-outline
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
              v-if="index < items.length - 1"
              :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    </wrapper>
    
  `,
})

export const Default = Template.bind({})
Default.args = {}

const ListVariantTpl = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => listData,
  template: `
    <wrapper>
      <v-list two-line flat class="py-4 px-4">
        <div class="font-title weight-700 ml-4 pt-3">Lista 1 de visación</div>
        
        <v-list-item-group
          :ripple="false"
          v-model="selected"
      >
        <template v-for="(item, index) in items">
          <v-list-item class="py-2" :key="item.title" :ripple="false">
            <template v-slot:default="{ active }">
              <v-list-item-content>

                <div class="text--primary pb-1"
                    v-text="item.headline"
                ></div>

                <div class="weight-700" v-text="item.subtitle"></div>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                    color="primary"
                >
                  mdi-trash-can-outline
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
          
        </template>
      </v-list-item-group>
    </v-list>
    </wrapper>
 `,
})

export const ListVariantFlat = ListVariantTpl.bind({})
ListVariantFlat.args = {}
