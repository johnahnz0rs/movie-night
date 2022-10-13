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
    <!-- <div class="outlined"> -->
    <MovieNightDetails />
    <!-- </div> -->

    
    <!-- NOMINATIONS -->
    <!-- NOMINATIONS -->
    <!-- NOMINATIONS -->
    <MovieNominations />


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
  data() {
    return {
      test: 'lol',
      movieNight: null,
    };
  },
  computed: {
    uId() {
      return this.$cookies.isKey('uId') ? this.$cookies.get('uId') : null;
    },
    // route params
    uIdAdminParam() {
      return this.$route.params.uIdAdmin;
    },
    dateParam() {
      return this.$route.params.date;
    },
    myIdParam() {
      return this.$route.params.myId;
    },
    // dbase objects
    // movieNight() {
    //   return this.$store.getters['events/movieNight'];
    // },
    votes() {
      return this.$store.getters['votes/votes'];
    },
    // calculated vars
    isAdmin() {
      if (this.$cookies.isKey('uId') && this.$cookies.get('uId') == this.movieNight.uIdAdmin) {
        return true;
      }
      return false;
    },
    allowedFriends() {
      return this.$store.getters['events/allowedFriends'];
    },
    amIAllowed() {
      return this.allowedFriends.includes(this.myIdParam);
    },
    nomsFinished() {
      return this.votes.nomsFinished;
    },
    votesFinished() {
      return this.votes.votesFinished;
    }

  },
  created() {
    console.log('**** starting VotesView > created() ****')

    // check if user is admin —— done in computed()
    // check if user is in the friends list —- done in computed()
    // check if nominations are finished -- done in computed()
    // check if votes are finished -- done in computed()

    // get the events/movieNight object
    // get the votes object
    const dbArgs = {
      uIdAdmin: this.uIdAdminParam,
      dateAndTime: this.dateParam,
    };
    this.$store.dispatch('events/getEventObject', dbArgs);
    this.$store.dispatch('votes/getVotesObject', dbArgs);
    this.movieNight = this.$store.getters['events/movieNight'];

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
