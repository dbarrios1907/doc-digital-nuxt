<template>
  <v-app class="dark">
    <div class="dx-notification-container" />
    <dx-navigation
      v-model="drawer"
      :right="_rightDrawer"
      :routes="routes"
      :clipped="clipped"
      fixed
      app
      @onmouseover="onMouseOver"
      @mouseleave="onMouseLeave"
    />

    <dx-header :drawer="drawer" :clipped-left="clipped" fixed app elevation="0" :height="92" @onToggleMenu="toggleDrawer" />
    <v-main app>
      <v-container fluid class="py-8 px-5 px-sm-10">
        <nuxt />
      </v-container>
    </v-main>

    <dx-footer :absolute="!fixed" class="mt-8 px-0 py-0" app />

    <dx-session-closed-modal v-model="sessionClosed" />
    <template v-if="sessionIdleExpire">
      <dx-session-expired-modal v-model="sessionExpired" @onClose="onExpirationModalClose" />
      <v-idle :loop="true" :wait="0" :duration="60 * 30" @idle="onIdle" />
    </template>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import settings from '~/shared/settings'

export default {
  data() {
    return {
      clipped: true, // toggles nav full height
      fixed: false,
      drawer: this.$vuetify.breakpoint.lg,
      miniVariant: false,
      right: true,
      lockBodyScroll: false,
      sessionIdleExpire: settings.sessionIdleExpire,
    }
  },

  computed: {
    ...mapState(['routes']),
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
  },
  onCreate() {
    console.log(this.sessionExpired)
    console.log(this.sessionIdleExpire)
  },
}
</script>
