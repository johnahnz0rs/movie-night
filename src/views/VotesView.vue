<template>
  <h1>Votes</h1>
  
  
  
  <!-- ADMIN PANEL -->
  <!-- ADMIN PANEL -->
  <!-- ADMIN PANEL -->
  <!-- <div v-if="isAdmin" class="outlined"> -->
  <div class="outlined"> <!-- leaving this always-on, for dev --> <!-- remember to remove this line (and use v-if="isAdmin") before it goes to prod -->
    <h2>admin panel</h2>
    <v-btn>edit movieNight details</v-btn><br />
    <v-btn>start/stop noms</v-btn><br />
    <v-btn>start/stop voting</v-btn>
  </div>


  <!-- MOVIENIGHT DETAILS -->
  <!-- MOVIENIGHT DETAILS -->
  <!-- MOVIENIGHT DETAILS -->
  <div v-if="movieNight" class="outlined">
    <!-- <h2>movieNight details</h2>
    <p><strong>created by</strong> {{ movieNight.admin.name }}</p>
    <p>
      <strong>where & when</strong> <br />
      {{ movieNight.location }} <br />
      {{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}
    </p>
    <p>
      <strong>who's invited</strong><br />
      <ul>
        <li v-for="friend in movieNight.friends" :key="friend.id">{{friend.name}}</li>
      </ul>
    </p> -->
  </div>

  <!-- NOMINATIONS -->
  <!-- NOMINATIONS -->
  <!-- NOMINATIONS -->
  <div v-if="!nomsFinished" class="outlined">
    <h2>nominations</h2>
    <p>let the friend see current list of nominations</p>
    <p>let the friend nominate their own choices</p>
    <p>use movieNight.nomsPerFriend</p>
  </div>
  <div v-else class="outlined">
    <h2>nominations are finished</h2>
    <p>please vote instead</p>
  </div>


  <!-- VOTING -->
  <!-- VOTING -->
  <!-- VOTING -->
  <div class="outlined">
    <h2>votes</h2>
    <p>let the friend vote</p>
    <p>use ranked choice - use the length of noms to figure out how many ranks are possible (max 3)</p>
  </div>


  <!-- RESULTS -->
  <!-- RESULTS -->
  <!-- RESULTS -->
  <div class="outlined">
    <h2>results</h2>
    <p>show the winner.</p>
    <p>show the first round winner & runner-ups</p>
    <p>show the second round winner & runner-ups</p>
  </div>


  <!-- dev -->
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
  data() {
    return {
      test: 'lol',
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
    // check if nominations are finished -- done in computed()
    // check if votes are finished -- done in computed()

    // get the events/movieNight object
    // get the votes object
    const dbArgs = {
      uIdAdmin: this.uIdAdminParam,
      dateAndTime: this.dateParam,
    };
    this.$store.dispatch('events/getEventObject', dbArgs);
    this.$store.dispatch('votes/getVotesObject', dbArgs);

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
