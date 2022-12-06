<template>
  <div>
    <h2>results</h2>
      <p>show the winner.</p>
      <p>show the first round winner & runner-ups</p>
      <p>show the second round winner & runner-ups</p>
  </div>
  <div>
    <p>no results yet. noms/voting in progress.</p>
    <p>{{votes}}</p>
  </div>
</template>


<script>
export default {
  name: 'MovieVoteResults',
  computed: {
    votes() {
      return this.$store.getters['votes/votes'];
    }
  }
};
</script>
