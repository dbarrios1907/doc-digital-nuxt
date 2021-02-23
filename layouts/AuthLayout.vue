<template>
  <v-app>
    <MainLayout>
      <template v-slot:header>
        <Header />
      </template>

      <template v-slot:main>
        <ContentLayout>
          <template v-slot:navbar>
            <Navigation v-model="drawer" :routes="routes" />
          </template>
          <template v-slot:content>
            <nuxt />
          </template>
        </ContentLayout>
      </template>

      <template v-slot:footer>
        <Footer color="white" />
      </template>
    </MainLayout>
  </v-app>
</template>
<script>
import MainLayout from './MainLayout'
import ContentLayout from './ContentLayout'
import Navigation from './components/navigation'

export default {
  name: 'DxAuthLayout',
  components: {
    MainLayout,
    ContentLayout,
    Navigation,
  },
  data() {
    return {
      drawer: true,
      routes: [],
    }
  },
}
</script>
