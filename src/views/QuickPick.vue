<template>

  <!-- page heading -->
  <div id="phase-selector">
    <h1>quick pick: step {{ view }}</h1>
    <div id="arrows">
      <v-btn v-if="view > 1" @click="previousStep">⇦ Prev Step</v-btn>
      <span v-else>&nbsp;</span>
      <v-btn v-if="view < 3" @click="nextStep">Next Step ⇨</v-btn>
    </div>
  </div>

        <v-btn @click="devprint(nominatedMovies)">print nominatedMovies</v-btn>
  
  <!-- step 1: nominations -->
  <div v-if="view == 1" id="step 1">
    <div id="step-1-info">
      <h2>nominate movies</h2>
      <p>search for the movie you want to nominate and click "nominate" on your choice(s). when movie nominations are done, click "next step" above.</p>
    </div>

    <!-- step 1-A: search -->
    <div id="search-fields">
      <v-row>
        <v-col cols="8" md="10"><v-text-field outlined v-model="searchTerm" placeholder="Search movies"></v-text-field></v-col>
        <v-col cols="4" md="2"><v-btn @click.prevent="getMovies">Search</v-btn></v-col>
      </v-row>
    </div>

    <!-- step 1-B: nominate movies -->
    <div v-if="resultData">
      <div v-for="movie in resultData" :key="movie.id" class="movie-card">
        <!-- {{ movie }} -->
        <p><span class="movie-title">{{ movie.title }} </span><span v-if="movie.release_date">({{ movie.release_date.slice(0,4) }})</span></p>
        <img v-if="movie.poster_path" class="inline-movie-data" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
        <p v-if="movie.overview" class="inline-movie-data">{{ movie.overview.slice(0,300) }}...</p>
        <v-btn @click="nominateMovie(movie)" :disabled="nominatedMovies.indexOf(movie) > -1 ? true : false">{{ nominatedMovies.indexOf(movie) > -1 ? "Nominated" : "Nominate this movie" }}</v-btn>
      </div>
    </div>
  </div>











  <!-- steep 2: how many attendees? -->
  <div v-if="view == 2" id="phase-2-voters">
    <h2>how many attendees?</h2>

    <div>
      <v-text-field outline v-model="numberOfVoters" type="number" label="How many attendees/voters?" min=2></v-text-field>
      <v-text-field outline v-model="numberOfVotesPerVoter" type="number" label="How many choices can each attendee make?" min=0 :max="`${nominatedMovies.length}`"></v-text-field>
    </div>

    <div>
      <v-btn @click="previousStep">nominate more movies</v-btn>
      <v-btn @click="nextStep">Start the Vote</v-btn>
    </div>
  </div>


  <!-- phase 3: start voting -->
  <div v-if="view == 3" id="phase-3-voting">
    <h2>lol phase 3</h2>

    <div v-if="nominatedMovies.length">
      <div v-for="movie in nominatedMovies" :key="movie.id" class="movie-card">
        <!-- {{ movie }} -->
        <img class="inline-movie-data" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
        <p>{{ movie.title }} ({{ movie.release_date.slice(0,4) }})</p>
        
        <p class="inline-movie-data">{{ movie.overview.slice(0,300) }}...</p>
        <!-- <v-btn @click="clickedAMovie(movie)">Nominate this movie</v-btn> -->
      </div>
    </div>

    <div>
      <v-btn @click="previousStep">Change number of attendees</v-btn>
    </div>
  </div>



</template>

<script>
export default {
  name: 'QuickPick',
  data() {
    return {
      view: 1,
      tmdbApi: '4b82ea454a84cdf8315e0146aa0aea00',
      searchTerm: '',
      resultData: [],
      nominatedMovies: [],
      numberOfVoters: 2,
      numberOfVotesPerVoter: 0,
    };
  },
  methods: {
    devprint(whatever) {
      console.log(whatever);
    },
    async getMovies() {
      console.log('getMovies', this.searchTerm);
      console.log(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmbdApi}&query=${this.searchTerm}`)
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApi}&query=${this.searchTerm}`);
      const responseData = await response.json();
      console.log(responseData);
      this.resultData = responseData.results;
    },
    nominateMovie(movie) {
      // console.log(`you clicked a movie, id: ${id}`);
      this.nominatedMovies.push(movie);
      console.log(this.nominatedMovies);
    },
    previousStep() {
      this.view--;
    },
    nextStep() {
      this.view++;
    }
  },
}
</script>
<style lang="scss" scoped>
#phase-selector {
  text-align: center;
  #arrows {
    display: flex;
    justify-content: space-between;
    button {
      margin: 0 12px;
    }
  }
}

#step-1 {
  #step-1-info {
    display: flex;
    justify-content: space-between;
  }
  #search-fields {
    // display: flex;
  }
}
.movie-card {
  border: 1px solid black;
  padding: 8px 12px;
  margin: 8px;
}
.inline-movie-data {
  display: inline-block;
}
.movie-title {
  font-size: 1.8em;
  font-weight: bold;
  /* padding-left: 8px; */
}
</style>



