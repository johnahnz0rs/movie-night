<template>
  <v-app>
    <HeaderNav />
    <InPageMenu />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import InPageMenu from './components/InPageMenu.vue';
export default {
  name: 'App',
  components: {
    HeaderNav,
    InPageMenu
  },
  data: () => ({
    //
  }),
}
</script>
