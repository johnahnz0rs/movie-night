<template>
  <div id="nominate-movies">
    
    <!-- header -->
    <v-row class="bg-yellow-lighten-2">
      <v-col>
        <h2 class="d-inline">enter your movie choices now</h2> 
      </v-col>
    </v-row>

    <!-- display nominations -->
    <v-row v-if="(nominations && nominations.length > 0)" class="bg-yellow-lighten-2 pb-5">
      <v-col cols="12">
        <h4>nominations</h4>
      </v-col>
      <v-col v-for="nom in nominations" :key="nom.id" cols="4" md="2" class="text-center">
        <!-- movie poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`" style="max-width: 110px;">
        <p><strong>{{nom.title}}</strong></p>
        <!-- remove this nom -->
        <v-btn @click="$emit('removeNom', nom)" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>
    </v-row>
    <!-- <v-row v-else><v-col><p>no nominations</p></v-col></v-row> -->



    <div v-if="(canStillNominate)">
      <!-- search bar -->
      <v-row class="bg-blue-lighten-4 pt-5">
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
          
          <!-- movie info -->
          <p class="movie-title">
            <span class="font-weight-bold text-h6">{{ movie.title }}</span> 
            <span v-if="movie.release_date"> ({{ movie.release_date.slice(0,4) }})</span>
          </p>
          <img v-if="movie.poster_path" class="movie-poster" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" :alt="`{{movie.title}}`"><br/>

          <!-- modal: movie details -->
          <v-dialog v-model="movie.dialog" fullscreen>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="plain" class="mt-1">see details</v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="d-flex justify-space-between">
                  <div>
                    <h2>{{movie.title}}</h2>
                    <p class="mb-5">({{movie.release_date.slice(0,4)}})</p>
                  </div>
                  <div>
                    <v-btn block @click="movie.dialog = false" color="red">Close</v-btn>
                  </div>
                </div>
                <p>{{ movie.overview }}</p>
                <div class="d-flex justify-space-around mt-5">
                  <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" />
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="movie.dialog = false" color="red">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- nominate button -->
          <v-btn @click="$emit('addNom', movie)" color="green" class="text-darken-2" :disabled="isMovieAlreadyInNominations(movie.id)">
            {{ isMovieAlreadyInNominations(movie.id) ? 'nominated' : 'nominate' }}
          </v-btn>

        </v-col>
      </v-row>
    </div>


  </div>
</template>


<script>
export default {
  props: [ 'nominations', 'canStillNominate' ],
  data() {
    return {
      searchTerm: '',
      searchResults: null,
      // searchResults: [
      //   {adult: false,backdrop_path: "/iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg",genre_ids: [12, 35, 10751, 16],id: 277834,original_language: "en",original_title: "Moana",overview: "In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain's daughter's island, she answers the Ocean's call to seek out the demigod to set things right.",popularity: 33.532,poster_path: "/4JeejGugONWpJkbnvL12hVoYEDa.jpg",release_date: "2016-11-23",title: "Moana",video: false,vote_average: 7.6,vote_count: 10731,},
      //   {adult: false,backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",genre_ids: [28, 35, 80, 53],id: 9737,original_language: "en",original_title: "Bad Boys",overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",popularity: 40.035,poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",release_date: "1995-04-07",title: "Bad Boys",video: false,vote_average: 6.8,vote_count: 5343},
      //   {adult: false,backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",genre_ids: [878, 12],id: 438631,original_language: "en",original_title: "Dune",overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",popularity: 162.847,poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",release_date: "2021-09-08", title: "Dune", video: false, vote_average: 7.9, vote_count: 7793,},
      // ], 
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
    // get search results - returns a list of movies
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
  },
};
</script>


<style lang="scss" scoped>
#nominate-movies {
  padding-bottom: 160px;

  #search-result {
    .movie-title {
      min-height: 50px;
      line-height: 0.85em;;
    }
  }


}
</style>

