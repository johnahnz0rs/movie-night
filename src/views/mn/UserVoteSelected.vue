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

    <div>
      <p>selected: {{selected}}</p>
    </div>


    <h3>voteStatus == selected</h3>
    <p>
      if voteStatus == selected<br/>&nbsp;<br/>&nbsp;
      - show the selections: winner, 2nd<br/>&nbsp;
      - show the rest of the votes and nominations (loop through allNoms; if a nom exists in allVotedMovies, then add to one list; if nom has no votes, then put in another list; display those lists sequentially)
    </p>
  

  </div>
</template>

<script>
export default {
  created() {

    // err: there are no votes
    if (!this.votes || Object.keys(this.votes).length == 0) {
      alert(`No votes were cast.\nSo you get nothing. You lose. Good day, sir.\n\nPS - jk plz ask ${this.mn.creatorName} to fix this.`);
    }

    // check for selected
    if (!this.selected || this.selected.length == 0) {
      // console.log('there is no mn.selected or mn.selected is an empty list', this.selected);
      // console.log('guestIds:', this.guestIds);
      // console.log('votes:', this.votes);
      // run the code to create selected
      

      // first round
      let firstChoices = [];
      let firstChoiceMovies = {};
      for (let i in this.guestIds) {
        const guestId = this.guestIds[i];
        firstChoices.push(this.votes[guestId][0]);
        if (!firstChoiceMovies[this.votes[guestId][0].id]) {
          firstChoiceMovies[this.votes[guestId][0].id] = this.votes[guestId][0];
        }
      }
      // console.log('firstChoices:', firstChoices);
      // console.log('firstChoiceMovies:', firstChoiceMovies);
      this.getWinnersAndLosers(firstChoiceMovies);


      // let firstChoicesTally = {};
      // for (let i in firstChoices) {
      //   const movieChoice = firstChoices[i];
      //   // console.log(`${movieChoice.id} has been selected`);
      //   if (!firstChoicesTally[movieChoice.id]) {
      //     firstChoicesTally[movieChoice.id] = 1;
      //   } else {
      //     firstChoicesTally[movieChoice.id] += 1;
      //   }
      // }
      // console.log('firstChoicesTally:', firstChoicesTally);

      // loop through firstChoicesTally
      // find out which movie has the most votes.
      // let firstChoiceTallyMax = null;
      // let firstChoiceMovie = [];
      // let lastPlaceTallyMin = null;
      // let lastPlace = [];
      // const firstChoiceMovieIds = Object.keys(firstChoicesTally);
      // for (let i in firstChoiceMovieIds) {
      //   const id = firstChoiceMovieIds[i];
      //   const movieObj = firstChoiceMovies[id];
        // if (!firstChoiceTallyMax) {
        //   firstChoiceTallyMax = 
        // }
        // if (firstChoicesTally[movieId] >= firstChoiceTallyMax) {

        // }
      // }
      
    }
  },
  data() { return {}; },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    votes() { return this.mn.votes ? this.mn.votes : {} },
    selected() { return this.mn.selected ? this.mn.selected : [] },
    guestIds() { 
      let list = [this.mn.creatorId];
      for (let i in this.mn.allGuests) {
        list.push(this.mn.allGuests[i].number);
      } 
      return list;
    },
  },
  methods: {
    getWinnersAndLosers(votes) {
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
        if (!movieObj[movie.id]) {
          movieObj[movie.id] = movie;
        }
      }

      // list of mIds (the id's of the movies that were voted for)
      const votesMovieIds = [...Object.keys(votesTally)]; // [mId, mId, ...]
      // console.log('votesMovieIds', votesMovieIds);

      // find max and min
      let max = null;
      let min = null;
      let winners = [];
      let losers = [];
      for (let m in votesMovieIds) {
        max = max ? max : 1;
        min = min ? min : 1;
        const mId = votesMovieIds[m];
        const votesForThisMovie = votesTally[mId];
        const thisMovie = movieObj[mId];
        if (votesForThisMovie == max) {
          winners.push(thisMovie);
        } else if (votesForThisMovie > max) {
          winners = [ {...thisMovie} ];
        }
        if (votesForThisMovie == min) {
          losers.push(thisMovie);
        } else if (votesForThisMovie < min) {
          losers = [ {...thisMovie} ];
        }

      }


      console.log('max:', max);
      console.log('min:', min);
      console.log('winners:', winners);
      console.log('losers:', losers);




      // get voteCounts
      // let max = null;
      // let min = null;
      // let winners = [];
      // let losers = [];
      
      // for (let i in Object.keys(votesTally)) {
      //   // const mId = i;
      //   max = max ? max : 1;
      //   min = min ? min : 1;
      //   if (votesTally[i] == max) {
      //     console.log('votesTally[i] == max');
      //     winners.push(allVotes.find(movie => movie.id == ))
      //   }
      //   if (votesTally[i] > max) {
      //     console.log('votesTally[i] > max');
      //     winners = [];
      //   }
      // }
      




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