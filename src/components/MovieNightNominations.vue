<template>
<div class="mb-1">

  <!-- Header -->
  <v-row class="d-flex justify-space-between">
    <v-col v-if="!canSubmitMyNoms" cols="12">
      <h3 class="text-center">waiting on other friends to finish nominating. check back soon</h3>
    </v-col>
    <v-col col="6">
      <div class=""> <!-- d-flex justify-space-between -->
        <p id="noms-per-friend">everyone can nominate up to {{this.movieNight.nomsPerFriend}} movie{{this.movieNight.nomsPerFriend > 1 ? 's' : ''}}</p>
      </div>
    </v-col>
    <!-- submitMyNoms BUTTON -->
    <v-col cols="6" class="text-right">
      <v-btn @click="submitMyNoms" color="green" :disabled="!canSubmitMyNoms">{{submitMyNomsButtonText}}</v-btn>
    </v-col>
    <v-col cols="12" class="mt-0 pt-0">
      <h2><span style="text-decoration: underline;">{{voterName}}'s nominations</span> ({{myNoms.length}})</h2>
    </v-col>
  </v-row>

  <!-- modal to double-check if voter wants to finish/submit myNoms -->
  <v-dialog v-model="submitMyNomsDialog" fullscreen persistent>
    <v-card>
      <v-card-text class="text-h5">
        <p class="text-h3 my-5">Are You Sure?</p>
        <p class="my-3">You nominated {{myNoms.length}} movie{{myNoms.length > 1 ? 's' : ''}}, but you can have up to {{movieNight.nomsPerFriend}}.</p>
        <p class="mb-5 pb-5"><strong>You cannot change your nominations later.</strong></p>
        <div class="d-flex justify-space-between">
          <v-btn @click="submitMyNomsDialog = false" variant="text" color="red">Go back,<br/>add more</v-btn>
          <v-btn @click="reallySubmitMyNoms" variant="tonal" color="green">I'm done<br/>nominating</v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        
      </v-card-actions>
    </v-card>
  </v-dialog>

  



  <!-- myNoms -->
  <v-row id="my-noms" class="mb-1 d-flex justify-space-around">
    
    <!-- forEach nom in myNoms -->
    <v-col v-for="nom in this.myNoms"
      :key="nom.id"
      class="text-center"
      cols="4"
      md="2">
      <img :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`" style="max-width: 110px;">
      <p><strong>{{nom.title}}</strong></p>
      <!-- remove this nom -->
      <v-btn @click="removeNomination(nom)" size="x-small" rounded="pill" color="red">remove</v-btn>
    </v-col>
  </v-row>
  <hr/>





  

  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <!-- search bar -->
  <v-row v-if="canStillNominate" class="mt-3">
    <v-col cols="9" md="10" class="pb-1">
      <h3 class="pl-1">search and nominate</h3>
      <v-text-field v-model="searchTerm" @keyup.enter="getMovieSearchResults" label="Search movies" variant="outlined" density="compact"></v-text-field>
    </v-col>
    <v-col cols="3" md="2" class="pb-1 d-flex align-center">
      <v-btn @click.prevent="getMovieSearchResults" variant="flat" color="blue">Search</v-btn>
    </v-col>
  </v-row>



  <!-- search results -->
  <v-row v-if="canStillNominate" id="search-results" class="text-center pb-5 mb-5">
    <v-col v-for="movie in searchResults" :key="movie.id" cols="6" sm="3" class="mb-3">

      <!-- movie info -->
      <p class="movie-title">
        <span class="font-weight-bold text-h6">{{ movie.title }}</span> 
        <span v-if="movie.release_date"> ({{ movie.release_date.slice(0,4) }})</span>
      </p>
      <img v-if="movie.poster_path" class="movie-poster" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" :alt="`{{movie.title}}`"><br/>

      <!-- nominate button -->
      <v-btn @click="nominateMovie(movie)" variant="tonal" color="green" class="text-darken-2" :disabled="isMovieAlreadyInMyNoms(movie)">
        {{ isMovieAlreadyInMyNoms(movie) ? 'nominated' : 'nominate' }}
      </v-btn>

    </v-col>
  </v-row>



  <!-- submit my noms -->
  <!-- <v-row v-if="!canSubmitMyNoms" class="mt-3">
    <v-col cols="12">
      <h3 class="text-center">waiting on other friends to finish nominating. check back soon</h3>
    </v-col>
  </v-row>
  <v-row class="mt-3">
    <v-col cols="12" class="d-flex justify-space-around">
      <v-btn @click="submitMyNoms" size="large" color="green" :disabled="!canSubmitMyNoms">{{submitMyNomsButtonText}}</v-btn>
    </v-col>
  </v-row> -->











</div>
</template>


<script>
// import { child, getDatabase, push, ref, update } from "firebase/database";
import { getDatabase, ref, update } from "firebase/database";
export default {

  data() {
    return {

      uIdAdmin: this.$route.params.uIdAdmin,
      mnId: this.$route.params.mnId,
      voterId: this.$route.params.voterId,
      searchTerm: '',
      searchResults: [],
      // searchResults: [
      //   {adult: false,backdrop_path: "/iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg",genre_ids: [12, 35, 10751, 16],id: 277834,original_language: "en",original_title: "Moana",overview: "In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain's daughter's island, she answers the Ocean's call to seek out the demigod to set things right.",popularity: 33.532,poster_path: "/4JeejGugONWpJkbnvL12hVoYEDa.jpg",release_date: "2016-11-23",title: "Moana",video: false,vote_average: 7.6,vote_count: 10731,},{adult: false,backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",genre_ids: [28, 35, 80, 53],id: 9737,original_language: "en",original_title: "Bad Boys",overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",popularity: 40.035,poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",release_date: "1995-04-07",title: "Bad Boys",video: false,vote_average: 6.8,vote_count: 5343},{adult: false,backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",genre_ids: [878, 12],id: 438631,original_language: "en",original_title: "Dune",overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",popularity: 162.847,poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",release_date: "2021-09-08", title: "Dune", video: false, vote_average: 7.9, vote_count: 7793,},
      // ], 
      submitMyNomsDialog: false,
    }; 
  },
  computed: { 
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },


    voterName() {
      let voterName = '';

      const friends = this.movieNight.friends ? this.movieNight.friends : [];
      for (let i=0; i < friends.length; i++) {
        if (friends[i]) {
          if (this.voterId == friends[i].id) {
            voterName = friends[i].name;
          }
        }
      }
      return voterName;
    },



    myNoms() {
      let nominations = []
      for (let i=0; i<this.movieNight.nominations[this.voterId].length; i++) {
        if (this.movieNight.nominations[this.voterId][i].id) {
          nominations.push(this.movieNight.nominations[this.voterId][i]);
        }
      }
      return nominations;
    },
    myNomsIds() {
      let ids = [];
      for (let i=0; i<this.myNoms.length; i++) {
        ids.push(this.myNoms[i].id);
      }
      return ids;
    },






    canStillNominate() {
      let canI = true;
      if (this.movieNight.nomsFinished) {
        canI = false;
      }
      if (this.myNoms.length == this.movieNight.nomsPerFriend) {
        canI = false;
      }
      if (this.movieNight.friendsWhoFinishedNominating && this.movieNight.friendsWhoFinishedNominating.includes(this.voterId)) {
        canI = false;
      }
      return canI;
    },
    canSubmitMyNoms() {
      let canI = true;
      if (this.movieNight.nomsFinished) {
        canI = false;
      }
      if (this.movieNight.friendsWhoFinishedNominating && this.movieNight.friendsWhoFinishedNominating.includes(this.voterId)) {
        canI = false;
      }
      return canI;
    },
    submitMyNomsButtonText() {
      let text = 'submit my noms';
      if (!this.canSubmitMyNoms) {
        text = 'submitted';
      } 
      return text;
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



    // // is movie already in myNoms
    isMovieAlreadyInMyNoms(movie) {
      return this.myNomsIds.includes(movie.id);
    },


    updateMyNomsInDbaseAndStore(noms) {

      // update the dbase
      const db = getDatabase();
      let updates = {};
      updates[`movieNights/${this.uIdAdmin}/${this.mnId}/nominations/${this.voterId}`] = noms;
      update(ref(db), updates);

      // update the store
      this.$store.dispatch('movieNights/updateMyNoms', {noms, voterId: this.voterId});

    },




    // nominate a movie
    async nominateMovie(movie) {
      console.log('*** nominateMovie() ***', movie);
      this.isMovieAlreadyInMyNoms(movie);

      // myNoms object
      let noms = this.myNoms;
      if (
      this.myNoms.length < this.movieNight.nomsPerFriend && 
      !this.isMovieAlreadyInMyNoms(movie)) {
        noms.push(movie);

        console.log('*** nominateMovie() -- noms', noms);
        this.updateMyNomsInDbaseAndStore(noms);
      }
    },




    // remove a nom
    removeNomination(movie) {
      console.log('*** removeNomination(movie)', movie);

      // create new myNoms
      const i = this.myNoms.indexOf(movie);
      console.log(i);
      let noms = this.myNoms;
      noms.splice(i,1);

      this.updateMyNomsInDbaseAndStore(noms);

      console.log(this.myNoms);
    },





    // submit myNoms
    submitMyNoms() {

      console.log('*** submitMyNoms() ');
      // check if less than max 
      if( this.myNoms.length < this.movieNight.nomsPerFriend) {
        this.submitMyNomsDialog = true;

      } else {
        this.reallySubmitMyNoms();
      }
      


    },





    // REALLY submit myNoms
    reallySubmitMyNoms() {
      
      console.log('*** reallySubmitMyNoms() ');
      this.submitMyNomsDialog = false;
      const noms = this.myNoms;
      const db = getDatabase();
      const uIdAdmin = this.uIdAdmin;
      const mnId = this.mnId;
      const voterId = this.voterId;
      // update myNoms in dbase and store
      this.updateMyNomsInDbaseAndStore(noms);


    // add self to friendsWhoFinishedNominating (list of votingIds)
      // update the dbase
      let friendsWhoFinishedNominating = this.movieNight.friendsWhoFinishedNominating ? this.movieNight.friendsWhoFinishedNominating : [];
      if (!friendsWhoFinishedNominating.includes(voterId)) {
        friendsWhoFinishedNominating.push(voterId);
      }
      let updates = {};
      updates[`movieNights/${uIdAdmin}/${mnId}/friendsWhoFinishedNominating/`] = friendsWhoFinishedNominating;
      update(ref(db), updates);

      // // update the store
      this.$store.dispatch('movieNights/updateFriendsWhoFinishedNominating', { friendsWhoFinishedNominating });



      // check if all users have finished nominations (nomsFinished)
      if (this.movieNight.friendsWhoFinishedNominating.length == this.movieNight.allowedFriends.length) {
        let nomsFinishedUpdate = {};
        nomsFinishedUpdate[`movieNights/${this.uIdAdmin}/${this.mnId}/nomsFinished`] = true;
        update(ref(db), nomsFinishedUpdate);  


        console.log('*** all friends have finished voting');
        this.$store.dispatch('movieNights/updateNomsFinished', { nomsFinished: true });
      } else {
        console.log('*** not everyone has finished voting yet');
      }
      
      
      // send a new sms msg "hey noms have finished. you can now vote."


    },
    
  },


};
</script>

<style lang="scss" scoped>

#search-results {
  .movie-title {
    min-height: 50px;
    line-height: 0.85em;;
  }

}

</style>

