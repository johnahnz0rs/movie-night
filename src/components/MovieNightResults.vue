<template>
  <h2>MovieNightResults.vue</h2>

  
</template>

<script>

export default {
  


  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },
  },

};
</script>