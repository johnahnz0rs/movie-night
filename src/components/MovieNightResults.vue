<template>
  <h2>MovieNightResults.vue</h2>
  <p>results {{ results }}</p>
  
</template>

<script>

export default {
  


  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },

    results() {
      let results = {};
      if (this.movieNight.results) {
        results = this.movieNight.results;
      }
      return results;
    },
  },

};
</script>