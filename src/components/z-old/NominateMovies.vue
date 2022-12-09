<template>
  <div id="nominate-movies">
    

    <!-- display myPicks -->
    <v-row>
      <v-col id="my-nominations">
        <h2 class="d-inline">{{headerMsg}}</h2> 
        <div v-if="(nominations && nominations.length > 0)">
          <DisplayMyPicks sectionTitle="nominations" :myPicks="nominations" @removeMovie="removeMovie" :editable="editable"/>
        </div>
      </v-col>
    </v-row>

    



    <!-- <div> -->
    <div v-if="(canStillNominate)">


      <!-- search bar -->
      <v-row class="pt-5">
        <v-col cols="12"><h4>add a movie</h4></v-col>
        <v-col cols="9" md="10" class="pb-1 d-flex align-middle">
          <v-text-field v-model="searchTerm" label="Search movies" placeholder="enter a movie title" @keyup.enter="getMovieSearchResults" variant="outlined" clearable density="compact"></v-text-field>
        </v-col>
        <v-col cols="3" md="2" class="pb-1 d-flex align-middle">
          <v-btn @click.prevent="getMovieSearchResults" variant="flat" color="blue">Search</v-btn>
        </v-col>
      </v-row>


      <!-- search results -->
      <v-row v-if="searchResults" class="text-center bg-blue-lighten-4">
        <v-col v-for="movie in searchResults" :key="movie.id" cols="6" sm="3" class="search-result mb-3">

          <MovieDetailWithModal :movie="movie" />

          <!-- nominate button -->
          <v-btn @click="$emit('addMovie', movie)" color="green" class="text-darken-2" :disabled="isMovieAlreadyInNominations(movie.id)">
            {{ isMovieAlreadyInNominations(movie.id) ? 'nominated' : 'nominate' }}
          </v-btn>

        </v-col>
      </v-row>
    </div>


  </div>
</template>


<script>
import DisplayMyPicks from './DisplayMyPicks.vue';
import MovieDetailWithModal from './MovieDetailWithModal.vue';
export default {
  props: [ 'nominations', 'canStillNominate', 'editable', 'headerMsg' ],
  emits: [ 'addMovie', 'removeMovie' ],
  components: {
    DisplayMyPicks,
    MovieDetailWithModal,
  },
  data() {
    return {
      searchTerm: '',
      searchResults: null,
    };
  },
  computed: {
    nominationsIds() {
      let list = [];
      if (this.nominations) {
        list = Array.from(this.nominations, movie => movie.id);
      }
      return list;
    },
  },
  watch: {
    searchResults() {
      if (this.searchResults && this.searchResults.length > 0) {
        for (let i in this.searchResults) {
          this.searchResults[i].dialog = false;
        }
      }
    },
  },
  methods: {
    async getMovieSearchResults() {
      const api_key = process.env.VUE_APP_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.searchTerm}&api_key=${api_key}`);
      let responseData = await response.json();
      for (let i=0; i < responseData.length; i++) {
        responseData.results[i].dialog = false;
      }
      this.searchResults = responseData.results;
    },
    isMovieAlreadyInNominations(id) {
      let already = false;
      if (this.nominationsIds) {
        already = this.nominationsIds.includes(id);
      }
      return already;
    },
    removeMovie(data) {
      this.$emit('removeMovie', data);
    },
  },
};
</script>


<style lang="scss" scoped>
#nominate-movies {
  padding-bottom: 160px;

  // #my-nominations {
  //   border-radius: 8px;
  //   border: 1px solid black;
  //   margin: 0 8px;
  // }

  #search-result {
    .movie-title {
      min-height: 50px;
      line-height: 0.85em;;
    }
  }


}
</style>

