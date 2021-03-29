<template>
  <dx-box bordered elevation add-class="px-1 py-1 flex-wrap">
    <v-list v-for="(group, groupIdx) in signList" :key="groupIdx" class="py-1" two-line flat style="width: 100%">
      <dx-box bordered add-class="px-1 py-1 flex-column">
        <dx-box add-class="pt-2">
          <div class="font-title weight-700 pl-2">{{ groupIdx + 1 }}° Lista de {{ listType }}</div>
          <v-spacer />
          <v-btn color="primary" icon @click="removeList(groupIdx)">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </dx-box>

        <dx-box add-class="px-3 pt-2">
          <UserAutocomplete
            v-model="group.input"
            :item-value="itemValue"
            @onRemoveItem="(item, valueKey) => removeSelection(groupIdx, item[valueKey])"
          />
          <dx-button height="48" small text color="primary" v-bind="$props" @click="addToList(group.input, groupIdx)">
            <dx-icon left chevron regular> mdi-plus-circle-outline </dx-icon>
            <span class="underline-text">Agregar {{ listType }}</span>
          </dx-button>
        </dx-box>

        <v-list-item-group class="pl-1" :ripple="false">
          <template v-for="(item, index) in group.list">
            <v-list-item :key="index" class="px-2 brd-group-list" :ripple="false">
              <template>
                <v-list-item-content>
                  <div class="text--primary line-height-22" v-text="item[usernameProp]" />

                  <div class="weight-700 line-height-22" v-text="item[entityProp]" />
                </v-list-item-content>

                <v-icon class="mr-2" style="font-size: 30px" color="primary" @click="removeFromList(groupIdx, index)"> mdi-delete-outline </v-icon>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </dx-box>
    </v-list>

    <dx-box centered add-class="py-2" style="min-width: 100%">
      <dx-button height="48" small text color="primary" v-bind="$props" @click="addList">
        <dx-icon left chevron regular> mdi-plus-circle-outline </dx-icon>
        <span class="underline-text">Agregar lista de visación</span>
      </dx-button>
    </dx-box>
  </dx-box>
</template>

<script>
import UserAutocomplete from '~/components/doc-digital/userAutocomplete'
export default {
  components: { UserAutocomplete },
  inheritAttrs: true,
  props: {
    listType: {
      type: String,
      default: 'visadores',
    },
    usernameProp: {
      type: String,
      default: 'username',
    },
    entityProp: {
      type: String,
      default: 'entity',
    },
    itemValue: {
      type: String,
      default: 'symbol',
    },
    mock: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    listName: '',
    signList: [], // {title: 'listTitle',    }
  }),
  methods: {
    resetAddList(index) {
      this.signList[index].input = ''
    },
    removeSelection(index, value) {
      this.signList[index].input = this.signList[index].input.filter(v => v[this.itemValue] !== value)
    },
    addList() {
      this.signList.push({
        input: '',
        list: [],
      })
    },
    async removeList(index) {
      if (this.mock) {
        return this.signList.splice(index, 1)
      }
      const agree = await this.$confirmInstance().open('Confirmación', '¿ Realmente desea eliminar esta lista ?')
      if (agree) this.signList.splice(index, 1)
    },
    addToList(items, index) {
      if (!items) return false
      items.forEach(item => {
        if (!this.signList[index].list.find(v => v[this.itemValue] === item[this.itemValue])) {
          this.signList[index].list.push({
            [this.usernameProp]: item[this.usernameProp],
            [this.entityProp]: item[this.entityProp],
          })
        }
      })
      this.resetAddList(index)
    },
    removeFromList(groupIndex, index) {
      this.signList[groupIndex].list.splice(index, 1)
    },
  },
}
</script>
<style lang="scss">
.brd-group-list {
  border-top: 1px solid rgba(55, 55, 55, 0.1);
}
</style>
