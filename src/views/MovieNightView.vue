<template>
  <v-container>
    <MovieNightDetails />

  </v-container>
  <h1>MovieNightView {{this.$route.params.mn}}</h1>
  <!-- <p v-if="movieNight">A {{movieNight}}</p> -->
  <p>B {{movieNight}}</p>
</template>

<script>
import MovieNightDetails from '../components/MovieNightDetails.vue';
export default {
  components: {
    MovieNightDetails,
  },
  data() {
    return {
      
    };
  },
  computed: {

    movieNight() { 
      return this.$store.getters['movieNights/movieNight'];
    },
  },
  created() {
    this.$store.dispatch('movieNights/getMovieNightObject', {mn: this.$route.params.mn});
    // this.movieNight = this.$store.getters['movieNights/movieNight'];
    // console.log('new line of code');
  },



};
</script>