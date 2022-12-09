<template>
  <div id="movie-night-view">
    <!-- <p class="text-caption">mn: {{mn}}</p> -->
    <v-row>
      <v-col>
        <h1>Movie Night</h1>
        <p>{{this.$route.params.mnId}}</p>
        <!-- <p class="text-caption">{{mn}}</p> -->
      </v-col>
    </v-row>

    <!-- no such movieNight -->
    <v-row v-if="errNoMN">
      <v-col>
        <p>this movieNight does not exist. plz check your link and try again.</p>
        <p class="text-center"><router-link to="/dash" class="text-black">start over</router-link></p>
      </v-col>
    </v-row>

    <!-- no user yet, "log in"/"authorize" -->
    <v-row v-if="(mn && (!userId || !userAllowed))">
      <v-col>
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
    <!-- user is allowed, show userPanel -->
    <v-row v-if="mn && userId && userName && userAllowed">
      <v-col>
        <UserPanel :userId="userId" :userName="userName" />
      </v-col>
    </v-row>
    
  </div>
  
</template>


<script>
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref } from 'firebase/database';
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

import AdminPanel from './AdminPanel.vue';
import UserPanel from './UserPanel.vue';
export default {
  components: {
    AdminPanel,
    UserPanel,
  },
  created() {
    const mnId = this.$route.params.mnId;
    get(ref(db, `/mn/${mnId}`)).then(snapshot => {
      if (snapshot.exists()) {
        const mn = snapshot.val();
        this.$store.dispatch('mn/mn', {mn});
      } else {
        this.errNoMN = true;
      }
    }).catch(error => {
      console.log(error);
    });
  },
  data() {
    return {
      // ui/ux
      errNoMN: null,
      userId: null,
      userName: null,
      userAllowed: false,
      userIsAdmin: false,
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
  },
  methods: {
    checkUserId() {
      const userId = this.userId;
      const allGuests = this.mn.allGuests;

      // check if user is admin or guest
      if (userId == this.mn.creatorId) {
        this.userName = this.mn.creatorName;
        this.userAllowed = true;
        this.userIsAdmin = true;
      } else {
        const user = allGuests.find(guest => {
          return guest.number === userId
        });
        if (user && user.name && user.number) {
          this.userAllowed = true;
          this.userName = user.name;
        } else {
          alert('¯\\_(ツ)_/¯\nCould there be a typo in your number?\nPlease try again.');
        }
      }

      // if guest, then update dbase/users/uId/created

    },
  },
};
</script>


<style lang="scss" scoped>
#movie-night-view {
  // background-color: red;
  padding: 0 8px 160px 8px;
}
</style>
