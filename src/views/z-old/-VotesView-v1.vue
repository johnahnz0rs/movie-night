<template>
  <v-container>

    <!-- header -->
    <!-- <v-row class="text-center">
      <v-col>
        <h1>Votes</h1>
      </v-col>
    </v-row> -->
    

    


    <!-- MOVIENIGHT DETAILS -->
    <!-- MOVIENIGHT DETAILS -->
    <!-- MOVIENIGHT DETAILS -->
    <MovieNightDetails />

    
    <!-- NOMINATIONS -->
    <!-- NOMINATIONS -->
    <!-- NOMINATIONS -->
    <div v-if="!nomsFinished">
      <MovieNominations />
    </div>


    <!-- VOTING -->
    <!-- VOTING -->
    <!-- VOTING -->
    <!-- <div class="outlined">
      <MovieVoting />
    </div> -->


    <!-- RESULTS -->
    <!-- RESULTS -->
    <!-- RESULTS -->
    <!-- <div class="outlined">
      <MovieVoteResults />
    </div> -->

    <!-- ADMIN PANEL -->
    <!-- ADMIN PANEL -->
    <!-- ADMIN PANEL -->
    <!-- <div v-if="isAdmin" class="outlined"> -->
    <div v-if="isAdmin" class="outlined" style="margin-top: 400px;"> <!-- leaving this always-on, for dev --> <!-- remember to remove this line (and use v-if="isAdmin") before it goes to prod -->
      <MovieAdminPanel />
    </div>





  </v-container>
</template>

<script>
import MovieAdminPanel from '../components/MovieAdminPanel.vue';
import MovieNightDetails from '../components/MovieNightDetails.vue';
import MovieNominations from '../components/-MovieNominations-v1.vue';
// import MovieVoting from '../components/MovieVoting.vue';
// import MovieVoteResults from '../components/MovieVoteResults.vue';

export default {
  components: {
    MovieAdminPanel,
    MovieNightDetails,
    MovieNominations,
    // MovieVoting,
    // MovieVoteResults,
  },
  data() {
    return {
      uId: '',
      isAdmin: false,
      // amIAllowed: false,
      // allowedFriends: [],
      // movieNight: {},
    };
  },
  computed: {
    nomsFinished() {
      return this.$store.getters['votes/nomsFinished'];
    },
    votesFinished() {
      return true;
    },
    // allowedFriends() {
    //   return this.$store.getters['events/allowedFriends']
    // },
    amIAllowed() {
      return this.$store.getters['events/amIAllowed'];
      // let amI = false;
      // if (this.allowedFriends) {
      //   amI = this.allowedFriends.includes(this.$route.params.myId);
      // }
      // // return this.allowedFriends.includes(this.$route.params.myId);
      // return amI;
    },
  },
  created() {
    console.log('**** starting VotesView > created() ****');
    
    const uIdAdminParam = this.$route.params.uIdAdmin;
    const dateParam = this.$route.params.date;
    const myIdParam = this.$route.params.myId;
    const dbArgs = {
      uIdAdmin: uIdAdminParam,
      dateAndTime: dateParam,
      myId: myIdParam,
    };
    this.$store.dispatch('events/getEventObject', dbArgs);
    this.$store.dispatch('votes/getVotesObject', dbArgs);

    this.uId = this.$cookies.get('uId');

    if (this.$route.params.uIdAdmin == this.uId) {
      this.isAdmin = true;
    }
    // this.allowedFriends = this.$store.getters['events/allowedFriends'];
  },
  mounted() {
    
    // if (this.allowedFriends.includes(this.$route.params.myId)) {
    //   this.amIAllowed = true;
    // }


    // console.log('*** created() - END');

  },

};
</script>
<style lang="scss" scoped>
.outlined {
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 24px;
}
</style>
