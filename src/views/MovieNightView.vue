<template>
  <v-container>
    

    <!-- amIAllowed -->
    <div v-if="amIAllowed">



      <MovieNightDetails />


      <div v-if="!nomsFinished">
        <MovieNightNominations />
      </div>


































      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <!-- dev -->
      <p>mnId: {{this.$route.params.mnId}}</p>
      <p>friendId: {{this.$route.params.voterId}}</p>
      <!-- <p v-if="movieNight">A {{movieNight}}</p> -->
      <p>movieNight: {{movieNight}}</p>






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
export default {
  components: {
    MovieNightDetails,
    MovieNightNominations,
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
  },
  created() {
    this.$store.dispatch('movieNights/getMovieNightObject', {mn: this.$route.params.mnId});
  },



};
</script>