<template>
<div class="mb-3">

  <!-- Header -->
  <v-row>
    <v-col>
      <h2>my nominations</h2>
      <p id="noms-per-friend">everyone can nominate up to {{this.movieNight.nomsPerFriend}} movie{{this.movieNight.nomsPerFriend > 1 ? 's' : ''}}</p>
    </v-col>
  </v-row>



  <!-- myNoms -->
  <v-row id="my-noms">
    <!-- <v-col v-for="nom in this.movieNight.nominations[$route.params.voterId]" -->
    <v-col v-for="nom in this.myNoms"
    
      :key="nom.id"
      class="pa-2 text-center"
      cols="4"
      md="3">
      <p>{{nom}}</p>
    </v-col>
  </v-row>

  

  <!-- search bar -->
  <v-row class="mt-3">
    <v-col cols="9" md="10" class="pb-1">
      <v-text-field v-model="searchTerm" @keyup.enter="getMovieSearchResults" label="Search movies" variant="outlined" density="compact"></v-text-field>
    </v-col>
    <v-col cols="3" md="2" class="pb-1">
      <v-btn @click.prevent="getMovieSearchResults" variant="flat" color="blue">Search</v-btn>
    </v-col>
  </v-row>



  <!-- search results -->
  <v-row>
    <v-col>

    </v-col>
  </v-row>







</div>
</template>


<script>
// export default {
export default {

  data() {
    return {
      searchTerm: '',
      searchResults: [],
    };
  },
  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },
    myNoms() {
      let nominations = []
      for (let i=0; i<this.movieNight.nominations[this.$route.params.voterId].length; i++) {
        if (this.movieNight.nominations[this.$route.params.voterId][i].id) {
          nominations.push(this.movieNight.nominations[this.$route.params.voterId][i]);
        }
      }
      return ['johnahn'];
    },
  },


  methods: {
    async getMovieSearchResults() {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4b82ea454a84cdf8315e0146aa0aea00&query=${this.searchTerm}`);
      let responseData = await response.json();
      for (let i=0; i < responseData.length; i++) {
        responseData.results[i].dialog = false;
      }
      this.searchResults = responseData.results;
      let something = this.myNoms;
      something.push('johnahnz0rs is l33t')
      console.log('lol this is getMovieSearch Results but i\'m printing myNoms', something);
    },

    
  },


};
</script>

<style lang="scss" scoped>

#search-results {
  // .movie-title {
  //   min-height: 50px;
  //   line-height: 0.85em;;
  // }

}

</style>

