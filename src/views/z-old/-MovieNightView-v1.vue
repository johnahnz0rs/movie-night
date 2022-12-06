<template>
  <v-container>
    

    <!-- amIAllowed -->
    <div v-if="amIAllowed">



      <MovieNightDetails />


      <div v-if="!nomsFinished">
        <MovieNightNominations />
      </div>



      <div v-if="nomsFinished && !votesFinished">
        <MovieNightVotes />
      </div>


      <div v-if="nomsFinished && votesFinished">
        <MovieNightResults />
      </div>






























      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <!-- <div style="margin-top:400px;">
        <pre>mnId: {{this.$route.params.mnId}}</pre>
        <pre>friendId: {{this.$route.params.voterId}}</pre>
        <pre>movieNight: {{movieNight}}</pre>
      </div> -->





    </div> <!-- amIAllowed END -->
    <!-- amIAllowed END -->
    <!-- amIAllowed END -->



    <!-- NOT ALLOWED -->
    <div v-else>
      <h2>Oops! Something went wrong.</h2> 
      <p>Ask your event organizer to send you a new link. Please & thank you.</p>
    </div> <!-- not allowed END -->




  </v-container>
  
</template>

<script>
import MovieNightDetails from '../components/MovieNightDetails.vue';
import MovieNightNominations from '@/components/MovieNightNominations.vue';
import MovieNightVotes from '../components/MovieNightVotes.vue';
import MovieNightResults from '../components/MovieNightResults.vue';
export default {
  components: {
    MovieNightDetails,
    MovieNightNominations,
    MovieNightVotes,
    MovieNightResults,
},
  data() {
    return {
      
    };
  },
  computed: {

    movieNight() { 
      return this.$store.getters['movieNights/movieNight'];
    },
    allowedFriends() {
      return this.movieNight.allowedFriends;
    },
    amIAllowed() {
      return this.allowedFriends.includes(this.$route.params.voterId);
    },
    nomsFinished() {
      return this.movieNight.nomsFinished;
    },
    votesFinished() {
      return this.movieNight.votesFinished;
    },
  },
  created() {
    this.$store.dispatch('movieNights/getMovieNightObject', { uIdAdmin: this.$route.params.uIdAdmin, mnId: this.$route.params.mnId });
  },



};
</script>