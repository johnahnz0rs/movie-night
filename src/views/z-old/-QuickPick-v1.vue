<template>
  <div id="page-quickpick">

    <!-- <div id="firebaseui-auth-container"></div> -->

    <!-- page header --> 
    <!-- page header --> 
    <!-- page header --> 
    <div v-if="view > 0" id="phase-selector">
      <h1>quick pick: step {{ view }}</h1>

      
      
      
      <!-- nav arrows (between the steps) --> <!-- THIS SHOULD BE A COMPONENT --> 
      <!-- nav arrows (between the steps) --> <!-- THIS SHOULD BE A COMPONENT --> 
      <!-- nav arrows (between the steps) --> <!-- THIS SHOULD BE A COMPONENT --> 
      <div id="arrows"> 
        <!-- previous step buttons -->
        <span v-if="view == 1">&nbsp;</span>
        <v-btn v-else-if="view == 2" @click="previousStep">⇦ Nominate <br>Movie(s)</v-btn>
        <v-btn v-else-if="view == 3" @click="previousStep">⇦ Cancel <br>the Vote</v-btn>
        <!-- next step buttons -->
        <v-btn v-if="view == 1" @click="nextStep" :disabled="nominatedMovies.length == 0">Confirm <br>Nominations ⇨</v-btn>
        <v-btn v-else-if="view == 2" @click="nextStep" :disabled="nominatedMovies.length < 2">Start <br>the Vote ⇨</v-btn>
        <v-btn v-else-if="view == 3" @click="finishedVoting" :disabled="Object.keys(votes).length < 1">EVERYONE is <br>Finished Voting ⇨</v-btn>
        <v-btn v-else-if="view == 4" @click="startFromScratch">Start from Scratch</v-btn>
      </div>


      <!-- info --> <!-- THIS SHOULD BE A COMPONENT -->
      <!-- info --> <!-- THIS SHOULD BE A COMPONENT -->
      <!-- info --> <!-- THIS SHOULD BE A COMPONENT -->
      <div id="info-about-this-step">
        <div v-if="view == 1">
          <h2>search & nominate movies</h2>
          <p>search for the movie you want to watch and click "nominate" (minimum 2).</p>
          <p>when you're ready, click "confirm" to review and vote.</p>
        </div>
        <div v-else-if="view == 2">
          <h2>review nominations</h2>
          <p>everything look good? ready to vote?</p>
        </div>
        <div v-else-if="view == 3">
          <h2>Vote for y'alls's movie</h2>
          <p><strong>one voter at a time:</strong></p>
          <p>make your selection. click "Finished" when everyone has voted. </p>
        </div>
      </div>

      <!-- <v-btn @click="devprint(tempVote)">print tempVote</v-btn> -->
    </div> <!-- end page header -->



<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->

  <!-- <div v-if="view == 0">
    <h2>How to Use:</h2>
    <ul>
      <li><strong>Step 1</strong> - Add your nomination. Let your friends nominate their movie choices, too.</li>
      <li><strong>Step 2</strong> - When everyone's done nominating their choices, review and confirm the list.</li>
      <li><strong>Step 3</strong> - Let each person cast their vote.</li>
    </ul>
  </div> -->

<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->
<!-- DO I NEED THIS? -->










  
    <!-- step 1: nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 1: nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 1: nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <div v-if="view == 1" id="step-1">

      <!-- step 1-A: search -->
      <div id="search-fields">
        <v-row>
          <v-col cols="8" md="10"><v-text-field @keyup.enter="getMovies" outlined v-model="searchTerm" placeholder="Search movies"></v-text-field></v-col>
          <v-col cols="4" md="2"><v-btn @click.prevent="getMovies">Search</v-btn></v-col>
        </v-row>
      </div>

      <!-- step 1-B: nominate movies -->
      <div v-if="searchResults">
        <v-row>
          <v-col v-for="movie in searchResults" :key="movie.id" class="movie-card" cols="6" md="4">
            <p class="movie-title">
              <span>{{ movie.title }} </span>
              <span v-if="movie.release_date">({{ movie.release_date.slice(0,4) }})</span>
            </p>
            <v-btn @click="nominateMovie(movie)" :disabled="nominatedMovies.indexOf(movie) > -1 ? true : false" class="nominate-button" color="green" variant="outlined">{{ nominatedMovies.indexOf(movie) > -1 ? "Nominated" : "Nominate" }}</v-btn>
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
            <p v-if="movie.overview">{{ movie.overview.slice(0,150) }}...</p>
            
          </v-col>
        </v-row>
      </div>


    </div>





    <!-- step 2: confirm nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 2: confirm nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 2: confirm nominations --> <!-- THIS SHOULD BE A COMPONENT -->
    <div v-if="view==2" id="step-2">

      <div v-if="nominatedMovies.length < 2" id="warning">
        <p id="not-enough-noms">not enough nominations (at least 2); <br>please go back to nominate more movies</p>
      </div>

      <div>
        <v-row>
          <v-col v-for="movie in nominatedMovies" :key="movie.id" class="movie-card" cols="6" md="4">
            <p class="movie-title"><strong>{{ movie.title }}</strong></p>
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`"><br />
            <v-btn @click="removeNomination(movie)" variant="outlined" color="red">remove</v-btn>
          </v-col>
        </v-row>
      </div>
      
      
    </div>





    <!-- step 3: start voting --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 3: start voting --> <!-- THIS SHOULD BE A COMPONENT -->
    <!-- step 3: start voting --> <!-- THIS SHOULD BE A COMPONENT -->
    <div v-if="view == 3" id="step-3">
      <v-row id="voter-label">
        <v-col>
          <h3>VOTER {{ totalVotes + 1 }}</h3>
        </v-col>
      </v-row>
      <div id="my-vote-buttons">
        <!-- <v-col><v-btn @click="resetMyVote">Reset <br>Voter {{ totalVotes + 1}}</v-btn></v-col>
        <v-col><v-btn @click="submitMyVote" :disabled="!tempVote.id">Voter {{ totalVotes + 1 }} done. <br>NEW VOTER.</v-btn></v-col> -->
        <v-btn @click="resetMyVote" :disabled="!tempVote.id" variant="outlined" color="red">Reset <br>Voter {{ totalVotes + 1}}</v-btn>
        <v-btn @click="submitMyVote" :disabled="!tempVote.id" variant="outlined" color="green">Voter {{ totalVotes + 1 }} done. <br>NEW VOTER.</v-btn>
      </div>
      
      <v-row>

        <v-col v-for="movie in nominatedMovies" :key="movie.id" cols="6" md="4" class="movie-card" :class="tempVote.id == movie.id ? 'my-vote' : ''">
          <!-- {{ movie }} -->
          <v-btn :id="movie.id" class="vote-button" @click="myVote(movie)" :disabled="'id' in tempVote" variant="tonal" color="green">{{ tempVote.id == movie.id ? 'MY VOTE' : 'Vote for this' }}</v-btn>
          <p><strong>{{ movie.title }} ({{ movie.release_date.slice(0,4) }})</strong></p>
          <img :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
          <p>{{ movie.overview.slice(0,120) }}...</p>
          
        </v-col>

      </v-row>


    </div> <!-- end vote -->




    <!-- step 4: vote results -->
    <div v-if="view == 4" id="step-4">
      <!-- <p>vote results</p> -->

      <v-row v-if="winningMovie.length == 1">
        <v-col>
          <h3><strong>winner</strong></h3>
          <img :src="`https://image.tmdb.org/t/p/w342/${winningMovie[0].movie.poster_path}`">
          <p><strong>{{ winningMovie[0].movie.title }}</strong></p>
          <p>x {{ winningMovie[0].count }} votes</p>
        </v-col>
      </v-row>

      <v-row v-else-if="winningMovie.length > 1">
        <v-col cols="12">
          <h3><strong>we got a tie</strong></h3>
        </v-col>
        <v-col v-for="movie in winningMovie" :key="movie.movie.id" cols="6" md="4">
          <img :src="`https://image.tmdb.org/t/p/w154/${movie.movie.poster_path}`">
          <p><strong>{{ movie.movie.title }}</strong></p>
          <p>x {{ movie.count }}</p>
        </v-col>
      </v-row>


      <v-row v-if="Object.keys(votes).length > 0">
        <v-col cols="12">
          <h3>Runner-up</h3>
        </v-col>
        <v-col v-for="movie in votes" :key="movie.movie.id" cols="4" md="3">
          <img :src="`https://image.tmdb.org/t/p/w92/${movie.movie.poster_path}`">
          <p><strong>{{ movie.movie.title }}</strong></p>
          <p>{{ movie.count }} vote</p>
        </v-col>
      </v-row>
    </div>





  </div> <!-- end page -->
</template>

<script>
export default {
  name: 'QuickPick',
  data() {
    return {
      view: 1,
      tmdbApi: '4b82ea454a84cdf8315e0146aa0aea00',
      searchTerm: '',
      searchResults: [],
      nominatedMovies: [
        // {
        //   adult: false,
        //   backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",
        //   genre_ids: [28, 35, 80, 53],
        //   id: 9737,
        //   original_language: "en",
        //   original_title: "Bad Boys",
        //   overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",
        //   popularity: 38.523,
        //   poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",
        //   release_date: "1995-04-07",
        //   title: "Bad Boys",
        //   video: false,
        //   vote_average: 6.8,
        //   vote_count: 5329,
        // },
        // {
        //   adult: false,
        //   backdrop_path: "/gxSVZCUlDd8upT1G2wdrUdz2hxG.jpg",
        //   genre_ids: [12, 28, 35, 53, 80],
        //   id: 8961,
        //   original_language: "en",
        //   original_title: "Bad Boys II",
        //   overview: "Out-of-control, trash-talking buddy cops Marcus Burnett and Mike Lowrey of the Miami Narcotics Task Force reunite, and bullets fly, cars crash and laughs explode as they pursue a whacked-out drug lord from the streets of Miami to the barrios of Cuba. But the real fireworks result when Marcus discovers that playboy Mike is secretly romancing Marcus’ sexy sister.",
        //   popularity: 56.892,
        //   poster_path: "/yCvB5fG5aEPqa1St7ihY6KEAsHD.jpg",
        //   release_date: "2003-07-18",
        //   title: "Bad Boys II",
        //   video: false,
        //   vote_average: 6.6,
        //   vote_count: 4570,
        // },
        // {
        //   adult: false,
        //   backdrop_path: "/3N316jUSdhvPyYTW29G4v9ebbcS.jpg",
        //   genre_ids: [53, 28, 80],
        //   id: 38700,
        //   original_language: "en",
        //   original_title: "Bad Boys for Life",
        //   overview: "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
        //   popularity: 97.577,
        //   poster_path: "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
        //   release_date: "2020-01-15",
        //   title: "Bad Boys for Life",
        //   video: false,
        //   vote_average: 7.2,
        //   vote_count: 7140
        // },
      ],
      tempVote: {},
      votes: {},
      totalVotes: 0,
      winningMovie: [],
    };
  },
  // computed: {},
  methods: {
    // devprint(whatever) {
    //   console.log(whatever);
    // },
    previousStep() {
      if (this.view == 3) {
        this.votes = {};
        this.tempVote = {};
      }
      this.view--;
    },
    nextStep() {
      this.view++;
    },
    async getMovies() {
      console.log('getMovies', this.searchTerm);
      console.log(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmbdApi}&query=${this.searchTerm}`)
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApi}&query=${this.searchTerm}`);
      const responseData = await response.json();
      console.log(responseData);
      this.searchResults = responseData.results;
    },
    nominateMovie(movie) {
      this.nominatedMovies.push(movie);
    },
    removeNomination(movie) {
      const i = this.nominatedMovies.indexOf(movie);
      if (i > -1) {
        this.nominatedMovies.splice(i, 1);
      }
    },
    myVote(movie) {
      this.tempVote = movie;
    },
    resetMyVote() {
      this.tempVote = {};
    },
    submitMyVote() {
      const movieId = this.tempVote.id;
      if ( movieId in this.votes ) {
        this.votes[movieId].count++;
      } else {
        this.votes[movieId] =  {
          movie: this.tempVote,
          count: 1,
        };
      }
      this.tempVote = {};
      this.totalVotes++;
    },
    finishedVoting() {
      this.view++;
      let mostVotes = 0;
      const voteIds = Object.keys(this.votes);
      for (let i in voteIds) {
        const id = voteIds[i];
        if ( this.votes[id].count == mostVotes ) {
          this.winningMovie.push(this.votes[id]);
        } else if ( this.votes[id].count > mostVotes ) {
          mostVotes = this.votes[id].count;
          this.winningMovie = [ this.votes[id] ];
        }
      }
      for ( let i in this.winningMovie ) {
        const id = this.winningMovie[i].movie.id;
        if ( id in this.votes ) {
          delete this.votes[id];
        }
      }
    },
    startFromScratch() {
      this.winningMovie = [];
      this.totalVotes = 0;
      this.votes = {};
      this.tempVote = {};
      this.nominatedMovies = [];
      this.searchResults = [];
      this.searchTerm = '';
      this.view = 1;
    }
  },
}
</script>
<style lang="scss" scoped>

.movie-card {
  border: 1px solid black;
  padding: 8px 12px;
  // margin: 8px;
}

#phase-selector {
  // position: fixed;
  margin: 8px 8px 32px 8px;
  #arrows {
    display: flex;
    justify-content: space-between;
    button {
      margin: 0 12px;
    }
  }
}

// seach for movies && click to nominate
#step-1 {
  #step-1-info {}
  #search-fields {
    // margin: 32px 12px;
  }
  .movie-title {
    font-size: 1.8em;
    font-weight: bold;
  }
  .nominate-button {
    margin-bottom: 12px;
  }
}

// review noms
#step-2 {
  #warning {
    margin-bottom: 18px; 
    #not-enough-noms {
      border: 1px solid red;
      color: red;
      font-weight: bold;
      padding: 8px;
      margin-top: 12px;
    }
  }

  // .v-row div {
  //   border: 1px solid black;
  // }
}

// vote
#step-3 {

  #voter-label {
    text-align: center;
    h3 {
      margin-top: -20px;
    }
  }

  #my-vote-buttons {
    display: flex;
    justify-content: space-between;
    padding-bottom: 32px;
  }
  .vote-button {
    margin-bottom: 8px;
  }
  .my-vote {
    border: 1px solid red;
  }
  

  

}
</style>



