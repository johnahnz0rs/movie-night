<template>
  <v-app>
    <HeaderNav />
    <v-main class="p-8">
      <router-view :db="db"/>
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
  data() {
    return {
      db: null,
    };
  },
  // created() {
  //   const app = initializeApp(firebaseConfig);
  //   this.db = getDatabase(app);
  // },
}
</script>

