<template>
  <v-app class="dark">
    <div class="dx-notification-container" />
    <dx-navigation
      v-model="drawer"
      :username="userName"
      :entity-name="entityName"
      :right="_rightDrawer"
      :routes="routes"
      :clipped="clipped"
      fixed
      app
      @onmouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      @entitySelectionFocus="onEntitySelectionFocus"
    />

    <dx-header :drawer="drawer" :clipped-left="clipped" fixed app elevation="0" :height="92" @onToggleMenu="toggleDrawer" />
    <v-main app>
      <v-container fluid class="py-8 px-5 px-sm-10">
        <nuxt />
      </v-container>
    </v-main>

    <dx-footer :absolute="!fixed" class="mt-8 px-0 py-0" app />

    <dx-session-closed-modal v-model="sessionClosed" />

    <keep-alive>
      <template v-if="sessionIdleExpire">
        <dx-session-expired-modal v-model="sessionExpired" @onClose="onExpirationModalClose" />
        <v-idle :loop="true" :wait="0" :duration="60 * 30" @idle="onIdle" />
      </template>
    </keep-alive>
    <dx-confirm-modal ref="$confirm" />
    <dx-entity-select-modal ref="$entitySelectModal" />
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import settings from '~/shared/settings'
import DxEntitySelectModal from '~/components/style-guide/modal/entity-select-modal'

export default {
  name: 'RootLayout',
  components: { DxEntitySelectModal },
  middleware: 'authenticated',
  data: vm => {
    return {
      clipped: true, // toggles nav full height
      fixed: false,
      drawer: vm.$vuetify.breakpoint.lg,
      miniVariant: false,
      right: true,
      lockBodyScroll: false,
      sessionIdleExpire: settings.sessionIdleExpire,
    }
  },

  computed: {
    ...mapState(['routes']),
    ...mapGetters(['userName', 'entityName']),
    sessionExpired() {
      return this.$store.state.session.expired
    },
    sessionClosed() {
      return this.$store.state.session.closed
    },
    _isMobile() {
      return this.$vuetify.breakpoint.lg
    },
    _rightDrawer() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md
    },
  },
  mounted() {
    this.$store.dispatch('fetchUserDashboard')
    if (this.$auth.$storage.getUniversal('pendingEntityLogin')) {
      this.onEntitySelectionFocus()
    }
  },
  methods: {
    ...mapActions({
      closeSession: 'session/closeSession',
      expireSession: 'session/expireSession',
    }),
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    onMouseOver() {
      this.lockBodyScroll = true
      console.log(this.lockBodyScroll)
    },
    onMouseLeave() {
      this.lockBodyScroll = false
    },

    onIdle() {
      this.$auth.logout(true)
    },

    onExpirationModalClose() {
      this.$auth.redirect('unauthorized', true)
    },

    async onEntitySelectionFocus() {
      // show entity selection
      const selectedEntity = await this.$refs.$entitySelectModal.open()
      console.log(selectedEntity)
      if (selectedEntity) {
        this.$auth.loginWithEntity(selectedEntity)
      }
    },
  },
}
</script>
