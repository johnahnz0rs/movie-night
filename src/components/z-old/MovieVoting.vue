<template>
<div v-if="votes">
  <h2>votes</h2>
  <p>votes.votesFinished: {{ votes.votesFinished }}</p>
  <p>let the friend vote</p>
  <p>use ranked choice - use the length of noms to figure out how many ranks are possible (max 3)</p>
</div>
<div>
  <p>votes are finished. get the popcorn.</p>
</div>
</template>

<script>
export default {
  computed: {
    votes() {
      return this.$store.getters['votes/votes'];
    },
  },
};
</script>
