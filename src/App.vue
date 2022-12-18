<template>
  <v-app class="loljohn">
    <HeaderNav />
    <v-main class="p-8">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
  name: 'App',
  components: {
    HeaderNav,
  },
}
</script>


<style lang="scss">
#app {
  padding-top: 56px;
}
</style>

