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
      <div class="outlined" style="margin-top: 400px;"> <!-- leaving this always-on, for dev --> <!-- remember to remove this line (and use v-if="isAdmin") before it goes to prod -->
      <MovieAdminPanel />
    </div>





  </v-container>
</template>

<script>
import MovieAdminPanel from '../components/MovieAdminPanel.vue';
import MovieNightDetails from '../components/MovieNightDetails.vue';
import MovieNominations from '../components/MovieNominations.vue';
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
  computed: {
    // uId() {
    //   return this.$cookies.isKey('uId') ? this.$cookies.get('uId') : null;
    // },
    // // calculated vars
    // isAdmin() {
    //   if (this.$cookies.isKey('uId') && this.$cookies.get('uId') == this.movieNight.uIdAdmin) {
    //     return true;
    //   }
    //   return false;
    // },
    // allowedFriends() {
    //   return this.$store.getters['events/allowedFriends'];
    // },
    // amIAllowed() {
    //   return this.allowedFriends.includes(this.myIdParam);
    // },
    // nomsFinished() {
    //   return this.votes.nomsFinished;
    // },
    // votesFinished() {
    //   return this.votes.votesFinished;
    // }
    nomsFinished() {
      return this.$store.getters['votes/nomsFinished'];
    },
  },
  created() {
    console.log('**** starting VotesView > created() ****')

    // check if user is admin —— done in computed()
    // check if user is in the friends list —- done in computed()
    // check if nominations are finished -- done in computed()
    // check if votes are finished -- done in computed()

    // get the events/movieNight object
    // get the votes object
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
