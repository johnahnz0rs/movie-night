<template>
  <v-app>
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

