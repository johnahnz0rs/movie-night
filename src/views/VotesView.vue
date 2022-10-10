<template>
  <h1>Votes</h1>
  <p>uId {{ $route.params.uId }}</p>
  <p>date {{ $route.params.date }}</p>
  <p>friendId {{ $route.params.friendId }}</p>
</template>

<script>
export default {
  // const uId = $route.params.uId;
  // const date = $route.params.date;
  // const friendId = $route.params.friendId;
  data() {
    return {
      isAdmin: false,
      uId: null,
      date: null,
      friendId: null,
      movieNight: null,
    };
  },
  created() {
    this.uId = this.$route.params.uId;
    this.date = this.$route.params.date;
    this.friendId = this.$route.params.friendId;

    // check if user is admin
      // if user is admin, then have dashboard with admin actions (e.g. add/remove friends, change nomsPerFriend, change date, time)
    // check if user is in the friends list
    // check if nominations are finished
    // check if votes are finished

  },


};
</script>

