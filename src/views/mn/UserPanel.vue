<template>
  <div id="user-panel">


    <v-row><v-col>
      <v-card>
        <v-card-title>hi, {{userName}}!</v-card-title>
        <v-card-text>
            join us for a movie night:<br/>&nbsp;<br/>
            <strong>{{date.monthName}} {{date.day}}, {{date.year}}</strong> <em>@ {{time.hour}}:{{time.min}} {{time.meridian}}</em><br/>
            <strong>Location:</strong> {{location}}
        </v-card-text>
      </v-card>
    </v-col></v-row>

    <div v-if="mn.nominationType == 'nPG' && mn.voteStatus == 'nominate'">
    <!-- <div class=""> -->
      <UserVoteNominate :userId="userId" />
    </div>

    
    <div v-if="mn.voteStatus == 'vote'">
    <!-- <div class=""> -->
      <UserVoteVote :userId="userId" />
    </div>

    <div v-if="mn.voteStatus == 'selected'">
    <!-- <div class="d-none"> -->
      <UserVoteSelected />
    </div>

  </div>
</template>

<script>
import UserVoteNominate from './UserVoteNominate.vue';
import UserVoteVote from './UserVoteVote.vue';
import UserVoteSelected from './UserVoteSelected.vue';
export default {
  components: {
    UserVoteNominate,
    UserVoteVote,
    UserVoteSelected,
  },
  props: [ 'userId', 'userName' ],
  computed: {
    mn() { return this.$store.getters['mn/mn']},
    date() { return this.mn.date },
    time() { return this.mn.time },
    location() { return this.mn.location },
  },
};
</script>


<style lang="scss" scoped>
#user-panel {

  p {
    border-bottom: 1px dashed black;
    padding-bottom: 6px;
    margin-bottom: 24px;
  }

}
</style>

