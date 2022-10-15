<template>
<div class="mb-3"> <!-- start MovieNominations -->

  <!-- header x -->
  <v-row>
    <v-col>
      <h2>my nominations</h2>
      <p v-if="nomsPerFriend" id="noms-per-friend">everyone can nominate up to {{ nomsPerFriend }} movie{{ nomsPerFriend > 1 ? 's' : '' }}</p>
    </v-col>
  </v-row>


  <!-- myNoms -->
  <v-row v-if="myNoms" id="my-noms">
    <v-col v-for="nom in myNoms" :key="nom.id" cols="4">
      <p v-if="nom.id" class="my-nom-single">
        {{nom}}
      </p>
      <p v-else class="my-nom-single">nominate a movie</p>
    </v-col>
  </v-row>


  <!-- search for movies -->
  <!-- search for movies -->
  <!-- search for movies -->
  <v-row class="mt-3">
    <v-col cols="9" md="10" class="pb-1">
    <!-- <v-col cols="9" md="10"> -->
      <v-text-field v-model="searchTerm" @keyup.enter="getMovieSearchResults" label="Search movies" variant="outlined" density="compact"></v-text-field>
    </v-col>
    <v-col cols="3" md="2" class="pb-1">
    <!-- <v-col cols="3" md="2"> -->
      <v-btn @click.prevent="getMovieSearchResults">Search</v-btn>
    </v-col>
  </v-row>





  <!-- nominate from search results -->
  <!-- nominate from search results -->
  <!-- nominate from search results -->
  <v-row v-if="searchResults" id="search-results" class="text-center">
    <v-col v-for="(movie, index) in searchResults" :key="movie.id" cols="6" md="4" class="mb-3">
      
      <!-- movie details -->
      <p class="movie-title"><span class="font-weight-bold text-h6">{{ movie.title }} </span><span v-if="movie.release_date">({{ movie.release_date.slice(0,4) }})</span></p>
      <img v-if="movie.poster_path" class="movie-poster" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" :alt="`{{movie.title}}`">
      

      <!-- nominate button -->
      <!-- nominate button -->
      <!-- nominate button -->
      <v-btn @click="nominateMovie(movie)" :disabled="!canStillNominate" variant="tonal" color="green">nominate</v-btn>


      <!-- modal - movie details -->
      <!-- modal - movie details -->
      <!-- modal - movie details -->
      <v-dialog v-model="searchResults[index].dialog" fullscreen>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="plain" class="mt-1">see details</v-btn>
        </template>
        <v-card>
          <v-card-text>
            <h2>{{movie.title}}</h2>
            <p class="mb-5">{{movie.release_date.slice(0,4)}}</p>
            <p>{{ movie.overview }}</p>
            <div class="d-flex justify-space-around mt-5">
              <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" :alt="`{{movie.title}}`" />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="searchResults[index].dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row> <!-- end nominate from search results - END -->





</div> <!-- end MovieNominations END -->
</template>

<script>
export default {
  data() {
    return {
      // const
      tmdbApi: '4b82ea454a84cdf8315e0146aa0aea00',
      // uIdAdminParam: this.$route.params.uIdAdmin,
      // dateParam: this.$route.params.date,
      // myIdParam: this.$route.params.myId,
      // search for a movie
      searchTerm: '',
      searchResults: [
        {
          adult: false,
          backdrop_path: "/iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg",
          genre_ids: [12, 35, 10751, 16],
          id: 277834,
          original_language: "en",
          original_title: "Moana",
          overview: "In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain's daughter's island, she answers the Ocean's call to seek out the demigod to set things right.",
          popularity: 33.532,
          poster_path: "/4JeejGugONWpJkbnvL12hVoYEDa.jpg",
          release_date: "2016-11-23",
          title: "Moana",
          video: false,
          vote_average: 7.6,
          vote_count: 10731,
        },
        {
          adult: false,
          backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",
          genre_ids: [28, 35, 80, 53],
          id: 9737,
          original_language: "en",
          original_title: "Bad Boys",
          overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",
          popularity: 40.035,
          poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",
          release_date: "1995-04-07",
          title: "Bad Boys",
          video: false,
          vote_average: 6.8,
          vote_count: 5343
        },
        {
          adult: false,
          backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
          genre_ids: [878, 12],
          id: 438631,
          original_language: "en",
          original_title: "Dune",
          overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
          popularity: 162.847,
          poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
          release_date: "2021-09-08",
          title: "Dune",
          video: false,
          vote_average: 7.9,
          vote_count: 7793,
        },
      ],
      myNoms: [],
      // votes: null,
      // nominate a movie
    };
  },
  computed: {
    votes() {
      return this.$store.getters['votes/votes'];
    },
    nomsPerFriend() {
      return this.$store.getters['votes/nomsPerFriend'];
    },
    // myNoms() {
    //   return this.$store.getters['votes/myNoms'];
    // },
    cleanedMyNoms() {
      let cleaned = [];
      for (let i=0; i<this.myNoms.length; i++) {
        if (this.myNoms[i].id) {
          cleaned.push(this.myNoms[i]);
        }
      }
      return cleaned;
    },
    canStillNominate() {
      // count the number of real noms (has 'id' prop)
      let nomsCount = 0;
      if (this.myNoms){
        for (let i=0; i<this.myNoms.length; i++) {
          if (this.myNoms[i].id) {
            nomsCount++;
          }
        }
      }
      // can i vote?
      let canNom = false;
      if (nomsCount < this.nomsPerFriend) {
        canNom = true;
      }
      return canNom;
    },
    


  },
  methods: {

    // search for movies
    async getMovieSearchResults() {
      console.log(`*** getMovieSearchResults(${this.searchTerm}) ***`);
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApi}&query=${this.searchTerm}`);
      let responseData = await response.json();
      for (let i=0; i < responseData.length; i++) {
        responseData[i].dialog = false;
      }
      this.searchResults = responseData.results;
    },


    // nominate a movie
    nominateMovie(movie) {
      console.log('*** nominateMovie(movie) ***', movie);
      console.log('myNoms', this.myNoms);
      let tempNoms = [];
      for (let i=0; i<this.myNoms.length; i++) {
        console.log(this.myNoms[i]);
        if (this.myNoms[i].id) {
          tempNoms.push(this.myNoms[i]);
        }
      }
      if (tempNoms.length < this.nomsPerFriend) {
        console.log('tempNoms has less than nomsPerFriend');
        tempNoms.push(movie);
      }

      console.log('tempNoms', tempNoms);
      // console.log('votesObject.nominations', votesObject);
      // console.log('myId', myId);

      // let cleanedMyNoms = [];
      // for (let i=0; i<this.myNoms.length; i++) {
      //   if (this.myNoms[i].id) {
      //     cleanedMyNoms.push(this.myNoms[i]);
      //   }
      // }
      // if (cleanedMyNoms.length < this.nomsPerFriend) {
      //   cleanedMyNoms.push(movie);
      // }
      
      // votesObject.nominations[myId] = cleanedMyNoms;
      // console.log('*** nominateMovie() -- votesObject ***', votesObject);
      // const update = {
      //   uIdAdmin: this.uIdAdminParam,
      //   date: this.dateParam,
      //   myId: this.myIdParam,
      //   votesObject,
      //   // movie,
      //   myNoms: cleanedMyNoms,
      // };
      // // if (this.canStillNominate) {
      //   // this.$store.dispatch('votes/updateMyNoms', update);
      // // }

      // console.log('*** nominateMovie() END', update);
    },



  },
  created() {
    console.log('*** starting MovieNominations > created()');
    this.myNoms = this.$store.getters['votes/myNoms'];
    // const uIdAdmin = this.$route.params.uIdAdmin;
    // const dateParam = this.$route.params.date;
    // const myIdParam = this.$route.params.myId;
    // const uIdAdminParam = this.$route.params.uIdAdmin;
    // const dateParam = this.$route.params.date;
    // const myIdParam = this.$route.params.myId;
    // const dbArgs = {
    //   uIdAdmin: uIdAdminParam,
    //   dateAndTime: dateParam,
    //   myId: myIdParam,
    // };
    
    // this.$store.dispatch('votes/getVotesObject', dbArgs);
    // console.log(this.$store.getters['votes/votes']);
    // this.wha = this.$store.getters['votes/votes'];
    // this.votes = this.$store.getters['votes/votes'];
    
  },
  
};
</script>

<style lang="scss" scoped>
#noms-per-friend {
  margin-top: -6px;
}
#my-noms {
  margin-top: -18px;
  .my-nom-single {
    border: 1px solid black; 
    min-height: 120px; 
    padding: 4px;
  }
}
#search-results {
  .movie-title {
    min-height: 50px;
    line-height: 0.85em;;
  }

}

</style>

