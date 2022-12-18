<template>
  <div id="selected">

    <!-- err: there are no votes -->
    <v-row v-if="(!votes || Object.keys(votes).length == 0)">
      <v-col>
        <p>
          No votes were cast.<br/>
          So you get nothing. You lose. Good day, sir.<br/>&nbsp;<br/>
          PS - jk plz ask {{ mn.creatorName }} to fix this.
        </p>
      </v-col>
    </v-row>


    <!-- display the winner (aka 'selected') -->
    <v-row v-if="selected">
      <v-col>
        <h2>please enjoy the movie!</h2>
        <div class="d-flex justify-center mt-5">
          <MovieDetailWithModal :movie="selected" />
        </div>
        <!-- <pre>selected: {{selected}}</pre> -->
      </v-col>
    </v-row>


  </div>
</template>

<script>
import { db } from '../../assets/db.js';
import { ref, set } from 'firebase/database';
import MovieDetailWithModal from '../../components/MovieDetailWithModal.vue';
export default {
  created() {

    // err: there are no votes
    if (!this.votes || Object.keys(this.votes).length == 0) {
      alert(`No votes were cast.\nSo you get nothing. You lose. Good day, sir.\n\nPS - jk plz ask ${this.mn.creatorName} to fix this.`);
    }

    // if no selected, then check for selected
    if (!this.selected ) {
      // run the vote analysis
      this.rankedChoiceVoting(this.votes);
    }
  },
  components: {
    MovieDetailWithModal,
  },
  data() { return {}; },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    allNomsMovieIds() {
      const list = [];
      for (let i in this.mn.allNominations) {
        const movieId = this.mn.allNominations[i].id;
        list.push(movieId);
      }
      return list;
    },
    votes() { return this.mn.votes ? this.mn.votes : {} },
    selected() { return this.mn.selected ? this.mn.selected : null },
    guestIds() { 
      let list = [];
      for (let i in this.mn.allGuests) {
        list.push(this.mn.allGuests[i].number);
      } 
      return list;
    },
  },
  methods: {


    rankedChoiceVoting(validVotes) {
      console.log('starting rankedChoiceVoting(validVotes)', validVotes);
      // dev note: allGuestsIds & allNomsMovieIds will stay constant, but validVotes will change
      const allGuestsIds = this.guestIds;
      const allNomsMovieIds = this.allNomsMovieIds;
      let currentRoundMovieChoices = [];

      let currentRoundTally = {};

      let currentMin = null;
      let currentMinMovies = [];
      let currentMax = null;
      let currentMaxMovies = [];

      

      // get all voters' choices for this round, aka currentRoundMovieChoices
      console.log(`// get all voters' choices for this round, aka currentRoundMovieChoices`);
      for (let i in allGuestsIds) {
        const userId = allGuestsIds[i];
        console.log('userId', userId);
        if (validVotes[userId] && validVotes[userId][0]) {
          currentRoundMovieChoices.push(validVotes[userId][0].id);
        }
      }
      console.log('currentRoundMovieChoices', currentRoundMovieChoices);


      // count the current round's votes, aka currentRoundTally
      for (let i in currentRoundMovieChoices) {
        const movieChoice = currentRoundMovieChoices[i];
        if (!currentRoundTally[movieChoice]) {
          currentRoundTally[movieChoice] = 1;
        } else {
          currentRoundTally[movieChoice] += 1;
        }
      }
      console.log('currentRoundTally:', currentRoundTally);



      // get the min and max movies
      for (let i in allNomsMovieIds) {
        const nomId = allNomsMovieIds[i];
        const thisMoviesCount = currentRoundTally[nomId];
        if (thisMoviesCount) {
          // check if currentMin & currentMax exist at all
          if (!currentMin) {
            currentMin = thisMoviesCount;
          }
          if (!currentMax) {
            currentMax = thisMoviesCount;
          }

          // check if min
          if (thisMoviesCount == currentMin) {
            currentMinMovies.push(nomId);
          } else if (thisMoviesCount < currentMin) {
            currentMin = thisMoviesCount;
            currentMinMovies = [nomId];
          }
          // check if max
          if (thisMoviesCount == currentMax) {
            currentMaxMovies.push(nomId);
          } else if (thisMoviesCount > currentMax) {
            currentMax = thisMoviesCount;
            currentMaxMovies = [nomId];
          }
        }
      }
      console.log('got mins and maxs');
      console.log('currentMin', currentMin);
      console.log('currentMinMovies', currentMinMovies);
      console.log('currentMax', currentMax);
      console.log('currentMaxMovies', currentMaxMovies);
      

      // if currentMaxMovies.length == 1, then that's the winner. (RETURN to exit out of this function)
      console.log('checking for winner (not even the majority, just who got the most votes)');
      if (currentMaxMovies.length == 1) {
        // update the dbase & the store
        let mnNew = {...this.mn};
        for (let i in mnNew.allNominations) {
          const movie = mnNew.allNominations[i];
          if (movie.id == currentMaxMovies[0]) {
            mnNew.selected = {...movie};
          }
        }
        set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew);
        this.$store.dispatch('mn/mn', {mn: mnNew});
        console.log('we got a winner!', mnNew.selected, mnNew);
        return;
      }

      console.log('no winner');



      // if there are multiple movies in currentMaxMovies, then that indicates a tie.
      // we have to cull the least voted movies (i.e. currentMinMovies) from validVotes, then re-run rankedChoiceVoting(updatedValidVotes) 
      // create a newValidVotes
      let newValidVotes = {};
      for (let i in allGuestsIds) {
        const guestId = allGuestsIds[i];
        let usersPreviousVotes = [...validVotes[guestId]];
        
        if (currentMinMovies.includes(usersPreviousVotes[0].id)) {
          usersPreviousVotes.splice(0,1);
        }
        newValidVotes[guestId] = usersPreviousVotes;



        // const guestsVoteThisRound = newValidVotes[guestId][0];
        // if (currentMinMovies.includes(guestsVoteThisRound)) {
        //   newValidVotes.splice(0,1);
        // }
      }

      // bc there is no single winner, run the next round of ranked choice voting
      console.log('running rankedChoiceVoting() again, with newValidVotes', newValidVotes);
      this.rankedChoiceVoting(newValidVotes);

    },


  },
};
</script>

<style lang="scss" scoped>
#selected {
  .v-col {
    min-height: 45vh;
  }
}

</style>