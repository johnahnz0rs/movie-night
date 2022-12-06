<template>

  <!-- header -->
  <!-- <v-row>
    <v-col>
      <h2>MovieNightResults.vue</h2>
    </v-col>
  </v-row> -->

  <!-- winner -->
  <v-row class="d-flex justify-space-around">
    <v-col v-for="movie in results.winner" :key="movie.id" class="text-center">
      <h3>winner</h3>
      <p>{{results.maxVote}} votes</p>
      <img :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
      <p><strong>{{movie.title}}</strong></p>

      <!-- <p>{{movie.overview}}</p> -->
      <!-- see details (modal) -->
      <v-dialog v-model="winnerDialog" fullscreen>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="plain" class="mt-1">see details</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <h2>{{movie.title}}</h2>
              <p class="mb-5">({{movie.release_date.slice(0,4)}})</p>
              <p>{{ movie.overview }}</p>
              <div class="d-flex justify-space-around mt-5">
                <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" />
              </div>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn block @click="nomsFinal[i].dialog = false" color="red">Close</v-btn> -->
              <v-btn block @click="winnerDialog = false" color="red">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-col>
  </v-row>


  <v-divider class="my-5 py-5"></v-divider>
  <!-- {{runnerUps}} -->
  <!-- runner-ups -->
  <v-row>
    <v-col class="text-center" cols="12">
      <h3>runner{{runnerUps.length > 1 ? 's' : ''}}-up</h3>
    </v-col>
    <v-col v-for="movie in runnerUps" :key="movie.movie.id" cols="4" class="text-center">
      <img :src="`https://image.tmdb.org/t/p/w92/${movie.movie.poster_path}`">
      <p><strong>{{movie.movie.title}}</strong></p>
      <p>{{movie.count}} vote{{movie.count > 1 ? 's' : ''}}</p>
    </v-col>
  </v-row>





  <!-- <v-row class="mt-5 pt-5"> -->
    <!-- <v-col> -->
      <!-- <pre>results {{ results }}</pre> -->
      <!-- <pre>voteCounts {{voteCounts}}</pre> -->
      <!-- <pre>results {{ results }}</pre> -->
      <!-- <p>allowedFriends: {{movieNight.allowedFriends}}</p> -->
      <!-- <p>votes: {{movieNight.votes}}</p> -->
    <!-- </v-col> -->
  <!-- </v-row> -->
</template>

<script>

export default {
  
  data() {
    return {
      winnerDialog: false,
    };
  },

  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },



    // get the vote results
    results() {
      /** i want this function to ranked choice the votes
      *   i want it to show me the first place winner, w/ how many votes and in what round
      *   and i want it to show me the runner ups, w/ # of votes
      * */





      let results = {};

      if (this.movieNight.results) {
        results = this.movieNight.results;
      } else {

        // get all votes & friends
        const votes = this.movieNight.votes;
        const allowedFriends = this.movieNight.allowedFriends;
        // let round = 'first';

        // get a list of all first choice votes
        let listOfAllVotedMovies = [];
        let idsOfVotedMovies = [];
        let voteCounts = {};
        let maxVote = 0;
        let tempWinner = [];
        let minimumForMajority = allowedFriends.length / 2;
        let winningMovie = [];
        let smallestVoteCount = 9999999999999999999999999999999999999;
        let tempLoser = [];

        
        // for each friend
        for (let i=0; i<allowedFriends.length; i++) {
          // add their first choice vote to a list -- listOfVotedMovies
          const voterId = allowedFriends[i];
          listOfAllVotedMovies.push(votes[voterId].first);
        }
        

        // when you have listOfAllVotedMovies,
        // for each movie in list, 
        for (let i=0; i<listOfAllVotedMovies.length; i++) {
          // tally the vote in voteCounts: { movieId: {count, movieInfo} }
          const movie = listOfAllVotedMovies[i];
          // if one already exists, then only increment count
          if (voteCounts[movie.id] && voteCounts[movie.id].count) {
            voteCounts[movie.id].count = voteCounts[movie.id].count + 1;
            console.log(`movie ${movie.id} already has a vote. incrementing count`);
          // if one doesn't exist, then create it
          } else {
            console.log(`movie ${movie.id} does not have a vote yet. creating object`);
            voteCounts[movie.id] = {
              count: 1,
              movie,
            };
            idsOfVotedMovies.push(movie.id);
          }
        }
        // console.log('&&&&&&&&&&&&&&&&&&&&&&& idsOfVotedMovies', idsOfVotedMovies);
          
        // when all firstChoices have been tabulated,
        // set a maxVote var (int)
        // and a winner var (array) 
        
        // for each movie in voteCounts
        for (let i=0; i<idsOfVotedMovies.length; i++) {
          const id = idsOfVotedMovies[i];
          console.log('***********movieId', id);


          // if movie.count > maxVote
          if (voteCounts[id].count > maxVote) {
            // then: update the maxVote = movie.count;
            maxVote = voteCounts[id].count;
            // then empty the winner list and push this movie to the freshly empty winner list
            tempWinner = [voteCounts[id].movie];
          // else if movie.count == maxVote
          } else if (voteCounts[id].count == maxVote) {
            // then: simply push the movie to the currently occupied winner list (i.e tie)
            tempWinner.push(voteCounts[id].movie);
          }

        }
          
          
        // reveal winner.


        // winning scenarios
        // simply: majority >50%
        if (maxVote > minimumForMajority) {
          winningMovie = tempWinner;
        // } else if (maxVote == minimumForMajority) {
          // or: exactly 50% (possible in even numbered groups) -- in this case, 
          // if there is a tie (i.e. only 2 movies voted for)
          // if there is no tie, then 

        } else {
          
          // for each movie in voteCounts
            // if movie's count is less than smallestVoteCount
              // update smallestVoteCount
              // update tempLoser
            // else if movie's count is equal to smallestVoteCount
              // add to tempLoser
            

          // let secondRoundVotes = []
          // after finding tempLoser
          // find what voters voted for the loser
          // clear listOfAllVotedMovies
          // clear idsOfVotedMovies
          // clear voteCounts
          // for each voter in voterIds
            // if their firstChoice vote is not in tempLoser
              // then add to listOfAllVotedMovies
            // if their vote is in tempLoser, 
              // then find the voter's second choice and add to listOfAllVotedMovies          
          
              
          // after getting new listOfAllVotedMovies
        }

        
        // IF NO CLEAR WINNER











        // dev
        console.log('*** this is MovieNightResults.vue > computed:results()');
        console.log('results:', results); 
        console.log('allowedFriends: ', allowedFriends);
        console.log('listOfAllVotedMovies: ', listOfAllVotedMovies);
        console.log('idsOfVotedMovies', idsOfVotedMovies);
        console.log('voteCounts', voteCounts);
        console.log('maxVote', maxVote);
        console.log('tempWinner', tempWinner);
        console.log('minimumForMajority', minimumForMajority);
        console.log('winningMovie', winningMovie);
        console.log('smallestVoteCount', smallestVoteCount);
        console.log('tempLoser', tempLoser);
        console.log('votes', votes);
        // console.log('*** this is MovieNightResults.vue > computed:results()', 'results:', results, 'allowedFriends', allowedFriends, 'round', round, 'listOfAllVotedMovies', listOfAllVotedMovies, 'voteCounts', voteCounts, 'votes', votes);

        results = {
          winner: tempWinner,
          maxVote,
          voteCounts,
          winningMovie,
          idsOfVotedMovies,
        };

      }

      // return {};
      return results;

    },


    runnerUps() {
      // const winner = this.results.winner;
      // const voteCounts = this.results.voteCounts;
      // const idsOfVotedMovies = this.results.idsOfVotedMovies;
      let runnerUps = this.results.voteCounts;

      for (let i=0; i<this.results.idsOfVotedMovies.length; i++) {
        const movieId = this.results.idsOfVotedMovies[i];
        if (movieId == this.results.winner[0].id) {
      //     const movie = {count: };
      //     runnerUps.push(movie);
          delete runnerUps[movieId];
        }
      }

      return runnerUps;
    },


  },

};
</script>