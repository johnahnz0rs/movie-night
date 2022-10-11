<template>
  <h1>Votes</h1>

  <div class="outlined">
    <h2>movieNight details</h2>
    <p>where & when</p>
    <p>who's invited</p>
    <p>invited by</p>
  </div>

  <div class="outlined">
    <h2>admin panel</h2>
    <p>let the admin edit movieNight details</p>
    <p>let the admin start/stop noms</p>
    <p>let the admin start/stop votes</p>
  </div>

  <div class="outlined">
    <h2>nominations</h2>
    <p>let the friend see current list of nominations</p>
    <p>let the friend nominate their own choices</p>
    <p>use movieNight.nomsPerFriend</p>
  </div>

  <div class="outlined">
    <h2>votes</h2>
    <p>let the friend vote</p>
    <p>use ranked choice - use the length of noms to figure out how many ranks are possible (max 3)</p>
  </div>

  <div class="outlined">
    <h2>results</h2>
    <p>show the winner.</p>
    <p>show the first round winner & runner-ups</p>
    <p>show the second round winner & runner-ups</p>
  </div>



  <div class="outlined">
    <h2>route params</h2>
    <p>uIdAdmin {{ uIdAdminParam }}</p>
    <p>date {{ dateParam }}</p>
    <p>myId {{ myIdParam }}</p>
    <p>isAdmin {{ isAdmin }}</p>
  </div>



  <div class="outlined">
    <h2>movieNight object</h2>
    <pre>{{ movieNight }}</pre>
    <p>allowed friends {{ allowedFriends }}</p>
    <p>am i allowed {{ amIAllowed }}</p>
  </div>




  <div class="outlined">
    <h2>votes object</h2>
    <p>{{ votes }}</p>
  </div>
</template>

<script>
export default {
  // const uId = $route.params.uId;
  // const date = $route.params.date;
  // const friendId = $route.params.friendId;
  data() {
    return {
      // const allProgram = await this.$store.getters['wins/program'];
      test: 'lol',
      // movieNight: null,
    };
  },
  computed: {
    uId() {
      return this.$cookies.isKey('uId') ? this.$cookies.get('uId') : null;
    },
    // route params
    uIdAdminParam() {
      return this.$route.params.uIdAdmin;
    },
    dateParam() {
      return this.$route.params.date;
    },
    myIdParam() {
      return this.$route.params.myId;
    },
    // dbase objects
    movieNight() {
      return this.$store.getters['events/movieNight'];
    },
    votes() {
      return this.$store.getters['votes/votes'];
    },
    // calculated vars
    isAdmin() {
      if (this.$cookies.isKey('uId') && this.$cookies.get('uId') == this.movieNight.uIdAdmin) {
        return true;
      }
      return false;
    },
    allowedFriends() {
      return this.$store.getters['events/allowedFriends'];
    },
    amIAllowed() {
      return this.allowedFriends.includes(this.myIdParam);
    },
    nomsFinished() {
      return this.votes.nomsFinished;
    },
    votesFinished() {
      return this.votes.votesFinished;
    }

  },
  created() {
    console.log('**** starting VotesView > created() ****')

    // check if user is admin —— done in computed()
    // check if user is in the friends list —- done in computed()



    const dbArgs = {
      uIdAdmin: this.uIdAdminParam,
      dateAndTime: this.dateParam,
    };
    // get the events/movieNight object
    this.$store.dispatch('events/getEventObject', dbArgs);
    // get the votes object
    this.$store.dispatch('votes/getVotesObject', dbArgs);
    
    // check if nominations are finished

    // check if votes are finished


  },

};
</script>
<style lang="scss" scoped>
.outlined {
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 24px;
}
</style>
