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
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDlVcmtXZAkr-SbiOKOByIT2rMK0zFqjc0",
  authDomain: "movie-night-27fb5.firebaseapp.com",
  databaseURL: "https://movie-night-27fb5-default-rtdb.firebaseio.com",
  projectId: "movie-night-27fb5",
  storageBucket: "movie-night-27fb5.appspot.com",
  messagingSenderId: "1090437858946",
  appId: "1:1090437858946:web:7e76c090421666c0b4969b",
  measurementId: "G-YDXT46S0MV"
};

export default {
  name: 'App',
  components: {
    HeaderNav,
  },
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$cookies.set("uId", user._delegate.uid);
      } else {
        console.log('App: there is no user', user);
      }
    });
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
