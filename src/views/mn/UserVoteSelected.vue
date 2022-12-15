<template>
  <div>

    <!-- err: there are no votes -->
    <div v-if="(!votes || Object.keys(votes).length == 0)">
      <v-row><v-col><p>
        There are no nominations for you to vote for.<br/>
        So you get nothing. You lose. Good day, sir.<br/>&nbsp;<br/>
        PS - jk plz ask {{ mn.creatorName }} to fix this.
      </p></v-col></v-row>
    </div>

    <div style="min-height: 45vh;">
      <p>selected: {{selected}}</p>
    </div>


  </div>
</template>

<script>
import { db } from '../../assets/db.js';
import { ref, set } from 'firebase/database';
export default {
  created() {

    // err: there are no votes
    if (!this.votes || Object.keys(this.votes).length == 0) {
      alert(`No votes were cast.\nSo you get nothing. You lose. Good day, sir.\n\nPS - jk plz ask ${this.mn.creatorName} to fix this.`);
    }

    // check for selected
    if (!this.selected ) {
      
      // get a list of all candidates/noms
      const allNomsMovieIds = [];
      for (let i in this.mn.allNominations) {
        const movieId = this.mn.allNominations[i].id;
        allNomsMovieIds.push(movieId);
      }
      // console.log('currentRoundMovieChoices', currentRoundMovieChoices);

      // run the vote analysis
      this.rankedChoiceVoting(this.guestIds, allNomsMovieIds, this.votes);
    }
  },
  data() { return {}; },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
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


    rankedChoiceVoting(allGuestsIds, allNomsMovieIds, validVotes) {
      
      let currentRoundMovieChoices = [];

      let currentRoundTally = {};

      let currentMin = null;
      let currentMinMovies = [];
      let currentMax = null;
      let currentMaxMovies = [];

      
      // get all voters' choices, aka currentRoundMovieChoices
      for (let i in allGuestsIds) {
        const userId = allGuestsIds[i];
        const thisUsersVote = validVotes[userId][0] ? validVotes[userId][0].id : null;
        if (thisUsersVote) {
          currentRoundMovieChoices.push(thisUsersVote);
        }
      }


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
          // check for currentMin & currentMax
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


      // if currentMaxMovies.length == 1, then that's the winner. (RETURN to exit out of this function)
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
      // create a newValidVotes
      let newValidVotes = {...validVotes};
      for (let i in allGuestsIds) {
        const guestId = allGuestsIds[i];
        const guestsVoteThisRound = newValidVotes[guestId][0];
        if (currentMinMovies.includes(guestsVoteThisRound)) {
          newValidVotes.splice(0,1);
        }
      }

      // bc there is no single winner, run the next round of ranked choice voting
      this.rankedChoiceVoting(allGuestsIds, allNomsMovieIds, newValidVotes);

    },














    getWinnersAndLosers2(votes) {
      // votes = { gId: {movie}, gId: {movie}, ... };


      // justVotes = [{movie}, {movie}] including repeats
      let justVotes = []; 
      const gIds = Object.keys(votes);
      for (let g in gIds) {
        const gId = gIds[g];
        justVotes.push(votes[gId]);
      }


      // votesTally
      let movieObj = {};
      let votesTally = {}; // { mId: numOfVotes, mId: numOfVotes, ... }
      for (let m in justVotes) {
        const movie = justVotes[m];
        if (!votesTally[movie.id]) {
          votesTally[movie.id] = 1;
        } else {
          votesTally[movie.id] += 1;
        }
        // if (!movieObj[movie.id]) {
        //   movieObj[movie.id] = movie;
        // }
      }

      // list of mIds (the id's of the movies that were voted for)
      const votesMovieIds = [...Object.keys(votesTally)]; // [mId, mId, ...]
      console.log('votesMovieIds', votesMovieIds);

      // find max and min
      // let max = null;
      let min = null;
      // let winners = [];
      let losers = [];
      for (let m in votesMovieIds) {
        // max = max ? max : 1;
        min = min ? min : 1;
        const mId = votesMovieIds[m];
        const votesForThisMovie = votesTally[mId];
        const thisMovie = movieObj[mId];
        // if (votesForThisMovie == max) {
        //   winners.push(thisMovie);
        // } else if (votesForThisMovie > max) {
        //   winners = [ {...thisMovie} ];
        // }
        if (votesForThisMovie == min) {
          losers.push(thisMovie);
        } else if (votesForThisMovie < min) {
          losers = [ {...thisMovie} ];
        }

      }


      // console.log('max:', max);
      console.log('min:', min);
      // console.log('winners:', winners);
      console.log('losers:', losers);






    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: purple;
  color: white;
  margin-bottom: 36px;
}
</style>