<template>
  <h2>MovieNightResults.vue</h2>
  <p>results {{ results }}</p>
  
</template>

<script>

export default {
  


  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },

    results() {
      let results = {};

      if (this.movieNight.results) {
        results = this.movieNight.results;
      } else {

        // get all votes & sort into the 3 choices
        const votes = this.movieNight.votes;
        const allowedFriends = this.movieNight.allowedFriends;
        let firstChoices = [];
        let secondChoices = [];
        let thirdChoices = [];
        for (let i=0; i<allowedFriends.length; i++) {
          const friendId = allowedFriends[i];
          if (votes[friendId].first && votes[friendId].first.id) {
            firstChoices.push(votes[friendId].first);
          }
          if (votes[friendId].second && votes[friendId].second.id) {
            secondChoices.push(votes[friendId].second);
          }
          if (votes[friendId].third && votes[friendId].third.id) {
            thirdChoices.push(votes[friendId].third);
          }
        }


        // let weHaveAWinner = false;




      }
      
      



      
      // results = votes;
      return results;
    },



  },

};
</script>