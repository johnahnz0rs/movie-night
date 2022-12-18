<template>
  <v-container id="movie-night-view">

    <v-row class="d-flex justify-center">
      <v-col :cols="movieNightViewColSize">

        <!-- no such movieNight -->
        <v-row><v-col v-if="errNoMN">
          <p class="mb-3">this movieNight does not exist. plz check your link and try again.</p>
          <p class="text-center"><router-link to="/" class="text-black">start over</router-link></p>
        </v-col></v-row>

        <!-- no user yet, "log in"/"authorize" -->
        <v-row><v-col v-if="(mn && (!userId || !userAllowed))">
          <h3>enter your phone number to begin</h3>
          <v-text-field label="phone number" placeholder="zip code + phone # (no hyphens)" type="number" clearable v-model="userId" @keyup.enter="checkUserId"></v-text-field>
          <v-btn @click.prevent="checkUserId" color="green">continue</v-btn>
        </v-col></v-row>

        <!-- user is admin, show adminPanel -->
        <AdminPanel v-if="(mn && userAllowed & userIsAdmin)" />

        <!-- user is allowed, show userPanel -->
        <UserPanel v-if="mn && userId && userName && userAllowed" :userId="userId" :userName="userName" />

      </v-col>
    </v-row>

  </v-container>
</template>


<script>
import { db } from '../../assets/db.js';
import { get, ref, set } from 'firebase/database';

import AdminPanel from './AdminPanel.vue';
import UserPanel from './UserPanel.vue';
export default {
  components: {
    AdminPanel,
    UserPanel,
  },
  created() {
    this.getMovieNightFromDbase();
    this.userId = this.$store.getters['mn/userId'];
    this.userName = this.$store.getters['mn/userName'];
    this.userAllowed = this.$store.getters['mn/userAllowed'];
    this.userIsAdmin = this.$store.getters['mn/userIsAdmin'];
  },
  data() {
    return {
      // ui/ux
      errNoMN: null,
      userId: null, //
      userName: null, //
      userAllowed: false, //
      userIsAdmin: false, //
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    movieNightViewColSize() {
      let c = '12';
      if (this.$vuetify.display.lgAndUp) {
        c = '4';
      } else if (this.$vuetify.display.mdAndUp) {
        c = '6';
      } else if (this.$vuetify.display.smAndUp) {
        c = '8';
      }
      return c;
    },
  },
  methods: {
    getMovieNightFromDbase() {
      const mnId = this.$route.params.mnId;
      get(ref(db, `/mn/${mnId}`)).then(snapshot => {
        // if mn exists
        if (snapshot.exists()) {
          const mn = snapshot.val();
          this.$store.dispatch('mn/mn', {mn});
        // if mn DNE, trigger error
        } else {
          this.errNoMN = true;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    checkUserId() {
      const userId = this.userId;
      const allGuests = this.mn.allGuests;
      // if user is admin
      if (userId == this.mn.creatorId) {
        this.userName = this.mn.creatorName;
        this.userAllowed = true;
        this.userIsAdmin = true;
      // if user is not admin
      } else {
        const user = allGuests.find(guest => {
          return guest.number === userId
        });
        // if user is a guest
        if (user && user.name && user.number) {
          // set user values
          this.userAllowed = true;
          this.userName = user.name;
          // update their "invited" list in dbase
          const userInvitedEndpoint = `/users/${userId}/invited`;
          get(ref(db, userInvitedEndpoint)).then(snapshot => {
            // if user already has a list
            const mnId = this.$route.params.mnId;
            if (snapshot.exists()) {
              const dbList = snapshot.val();
              if (!dbList.includes(mnId)) {
                set(ref(db, userInvitedEndpoint), [mnId, ...dbList]);
              } 
            // if user does not already have a list
            } else {
              set(ref(db, userInvitedEndpoint), [mnId]);
            }
          }).catch(error => {
            console.log(error);
          });
        // if there is no guest with that id
        } else {
          alert('¯\\_(ツ)_/¯\nCould there be a typo in your number?\nPlease try again.');
        }
      }

      

    },
  },
};
</script>


<style lang="scss" scoped>
#movie-night-view {
  padding-bottom: 82px;
  padding-top: 46px;
}
</style>
