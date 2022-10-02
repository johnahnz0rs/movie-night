<template>

  <!-- page heading -->
  <div id="phase-selector">
    <h1>quick pick: step {{ view }}</h1>
    <div id="arrows">
      <v-btn v-if="view > 1" @click="previousStep">⇦ Prev Step</v-btn>
      <span v-else>&nbsp;</span>
      <v-btn v-if="view <= 3" @click="nextStep">Next Step ⇨</v-btn>
    </div>
  </div>

        <v-btn @click="devprint(nominatedMovies)">print nominatedMovies</v-btn>
  
  <!-- step 1: nominations -->
  <div v-if="view == 1" id="step-1">
    <div id="step-1-info">
      <h2>nominate movies</h2>
      <p>search for the movie you want to nominate and click "nominate" on your choice(s). when movie nominations are done, click "next step" above.</p>
    </div>

    <!-- step 1-A: search -->
    <div id="search-fields">
      <v-row>
        <v-col cols="8" md="10"><v-text-field @keyup.enter="getMovies" outlined v-model="searchTerm" placeholder="Search movies"></v-text-field></v-col>
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





  <!-- step 2: confirm nominations -->
  <div v-if="view==2" id="step-2">
    <div id="step-2-info">
      <h2>review nominations</h2>
      <p>click "prev step" to nominate more movies</p>
      <p>click "next step" if everything looks good</p>
    </div>

    <v-row v-if="nominatedMovies.length > 1">
      <v-col cols="5" v-for="movie in nominatedMovies" :key="movie.id">
        <p><strong>{{ movie.title }}</strong></p>
        <img v-if="movie.poster_path" class="inline-movie-data" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`"><br />
        <v-btn @click="removeNomination(movie)">remove</v-btn>
      </v-col>
    </v-row>
    <div v-else>
      <p id="not-enough-noms">not enough movies nominated; please click "prev step" to nominate more</p>
    </div>
  </div>










  <!-- steep 3: how many attendees? -->
  <div v-if="view == 3" id="step-3">
    <h2>how many watchers/voters?</h2>

    <div>
      <v-text-field outline v-model="numberOfVoters" type="number" label="How many voters?" min=2></v-text-field>
      <!-- <v-text-field outline v-model="numberOfVotesPerVoter" type="number" label="How many choices can each attendee make?" min=0 :max="nominatedMovies.length"></v-text-field> -->
    </div>
  </div>






  <!-- step 4: start voting -->
  <div v-if="view == 4" id="step-4">
    <h2>Vote for tonight's movie</h2>

    <div v-for="voterNumber in Object.keys(voters)" :key="voterNumber">
        {{voterNumber}}lol
    </div>








    <v-row v-if="nominatedMovies.length" style="display: none;">
      <v-col v-for="movie in nominatedMovies" :key="movie.id" class="movie-card">
        <!-- {{ movie }} -->
        <img class="inline-movie-data" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
        <p>{{ movie.title }} ({{ movie.release_date.slice(0,4) }})</p>
        
        <p class="inline-movie-data">{{ movie.overview.slice(0,300) }}...</p>
        <!-- <v-btn @click="clickedAMovie(movie)">Nominate this movie</v-btn> -->
      </v-col>
    </v-row>
  </div>



</template>

<script>
export default {
  name: 'QuickPick',
  data() {
    return {
      view: 4,
      tmdbApi: '4b82ea454a84cdf8315e0146aa0aea00',
      searchTerm: '',
      resultData: [],
      nominatedMovies: [
        {
          adult: false,
          backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",
          genre_ids: [28, 35, 80, 53],
          id: 9737,
          original_language: "en",
          original_title: "Bad Boys",
          overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",
          popularity: 38.523,
          poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",
          release_date: "1995-04-07",
          title: "Bad Boys",
          video: false,
          vote_average: 6.8,
          vote_count: 5329,
        },
        {
          adult: false,
          backdrop_path: "/gxSVZCUlDd8upT1G2wdrUdz2hxG.jpg",
          genre_ids: [12, 28, 35, 53, 80],
          id: 8961,
          original_language: "en",
          original_title: "Bad Boys II",
          overview: "Out-of-control, trash-talking buddy cops Marcus Burnett and Mike Lowrey of the Miami Narcotics Task Force reunite, and bullets fly, cars crash and laughs explode as they pursue a whacked-out drug lord from the streets of Miami to the barrios of Cuba. But the real fireworks result when Marcus discovers that playboy Mike is secretly romancing Marcus’ sexy sister.",
          popularity: 56.892,
          poster_path: "/yCvB5fG5aEPqa1St7ihY6KEAsHD.jpg",
          release_date: "2003-07-18",
          title: "Bad Boys II",
          video: false,
          vote_average: 6.6,
          vote_count: 4570,
        },
        {
          adult: false,
          backdrop_path: "/3N316jUSdhvPyYTW29G4v9ebbcS.jpg",
          genre_ids: [53, 28, 80],
          id: 38700,
          original_language: "en",
          original_title: "Bad Boys for Life",
          overview: "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
          popularity: 97.577,
          poster_path: "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
          release_date: "2020-01-15",
          title: "Bad Boys for Life",
          video: false,
          vote_average: 7.2,
          vote_count: 7140
        },
      ],
      numberOfVoters: 2,
      
      // numberOfVotesPerVoter: 0,
    };
  },
  computed: {
    voters() {
      let vA = {};
      for (let i=1; i <= this.numberOfVoters; i++ ) {
        vA[i] = {
          firstChoice: ''
        };
      }
      return vA;
    }
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
    removeNomination(movie) {
      const i = this.nominatedMovies.indexOf(movie);
      if (i > -1) {
        this.nominatedMovies.splice(i, 1);
      }
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
    // display: flex;
    // justify-content: space-between;
  }
  #search-fields {
    // display: flex;
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
}

#step-2 {
  #not-enough-noms {
    border: 1px solid red;
    padding: 8px;
    margin-top: 12px;
  }
}
</style>



