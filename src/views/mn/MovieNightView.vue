<template>
  <div id="movie-night-view">

    <v-row>
      <v-col>
        <h1>Movie Night</h1>
        <p>{{this.$route.params.mnId}}</p>
        <p>{{mn}}</p>
      </v-col>
    </v-row>

    <!-- no such movieNight -->
    <v-row v-if="!mn">
      <v-col>
        <p>this movieNight does not exist. plz check your link and try again.</p>
      </v-col>
    </v-row>

    <!-- no user yet -->
    <v-row v-if="(mn && (!userId || !userAllowed))">
      <v-col>
        <!-- <v-alert type="error" density="compact">You are not allowed to view this event.</v-alert> -->
        <h3>enter your phone number to begin</h3>
        <v-text-field label="phone number" placeholder="zip code + phone # (no hyphens)" type="number" clearable v-model="userId" @keyup.enter="checkUserId"></v-text-field>
        <v-btn @click.prevent="checkUserId" color="green">continue</v-btn>
      </v-col>
    </v-row>

    <!-- user is admin, show adminPanel -->
    <v-row v-if="(mn && userAllowed & userIsAdmin)">
      <v-col>
        <AdminPanel />
      </v-col>
    </v-row>

    <!-- user is allowed -->
    <!-- <v-row v-if=""></v-row> -->
    
  </div>
  
</template>


<script>
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

import AdminPanel from './AdminPanel.vue';
export default {
  components: {
    AdminPanel,
  },
  data() {
    return {
      mn: null,
      userId: null,
      userName: null,
      userAllowed: false,
      userIsAdmin: false,
    };
  },
  computed: {},
  methods: {
    checkUserId() {
      if (this.userId == this.mn.creatorId) {
        this.userAllowed = true;
        this.userIsAdmin = true;
      } else {
        for (let i in this.mn.allGuests) {
          if (this.userId == this.mn.allGuests[i].number) {
            this.userAllowed = true;
          }
        }
        if (!this.userAllowed) {
          alert('You are not allowed to view this event. Please try again.');
        }
      }
    },
  },
  created() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID,
      measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    get(ref(db, `/mn/${this.$route.params.mnId}`)).then(snapshot => {
      if (snapshot.exists()) {
        const movieNight = snapshot.val();
        this.mn = movieNight;
      }
    }).catch(error => {
      console.log(error);
    });
  },
};
</script>


<style lang="scss" scoped>
#movie-night-view {
  // background-color: red;
  padding: 0 8px;
}
</style>
