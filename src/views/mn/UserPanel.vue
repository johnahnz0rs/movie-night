<template>
  <div id="user-panel">

    <!-- welcome -->
    <v-row class="mb-5"><v-col>
      <v-card class="bg-blue-lighten-4">
        <v-card-text>
          <p class="text-subtitle-1 font-weight-bold mb-2">hi, {{userName}}! join us for a movie night</p>
          <p class="font-weight-bold text-center">
            <strong>{{date.monthName}} {{date.day}}, {{date.year}}</strong>
            <br/><em>{{time.hour}}:{{time.min}} {{time.meridian.toLowerCase()}}</em><br/>
            <strong>Location:</strong><br/>
            <em>{{location}}</em>
          </p>
        </v-card-text>
      </v-card>
    </v-col></v-row>

    
    <!-- nominate -->
    <div v-if="mn.nominationType == 'nPG' && mn.voteStatus == 'nominate'">
    <!-- <div class=""> -->
      <UserVoteNominate :userId="userId" />
    </div>

    
    <!-- vote -->
    <div v-if="mn.voteStatus == 'vote'">
      <UserVoteVote :userId="userId" />
    </div>


    <!-- movie(s) selected -->
    <div v-if="mn.voteStatus == 'selected'">
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


