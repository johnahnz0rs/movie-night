<template>
  <v-app>
    <HeaderNav />
    <v-main class="p-8">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';


export default {
  name: 'App',
  components: {
    HeaderNav,
  },
  created() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID,
      measurementId: process.env.VUE_APP_MEASUREMENT_ID,
    };
    firebase.initializeApp(firebaseConfig);
    
    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user) {
    //     this.$cookies.set("uId", user._delegate.uid);
    //   } else {
    //     console.log('App: there is no user', user);
    //   }
    // });
  },
  data: () => ({
    //
  }),
}
</script>

<style scoped>
/* main.v-main {
  
} */
</style>
