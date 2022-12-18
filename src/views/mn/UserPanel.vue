<template>
  <div id="user-panel">

    <!-- welcome -->
    <v-row class="mb-5"><v-col>
      <v-card class="bg-blue-lighten-4">
        <v-card-text>
          <h2 class="mb-2">hi, {{userName}}! join us for a movie night</h2>
          <div class="d-flex justify-space-around font-weight-bold py-2 px-1 mb-2" style="border: 1px solid black;">
            <p class="w-50">
              <span class="text-decoration-underline">when?</span><br/>
              {{date.monthName}} {{date.day}}, {{date.year}}<br/>
              <em>{{time.hour}}:{{time.min}} {{time.meridian.toLowerCase()}}</em>
            </p>
            <p>
              <span class="text-decoration-underline">where?</span><br/>
              <em>{{location}}</em>
            </p>
          </div>
          
          <p v-if="nomType=='nPG' && voteStatus=='nominate'">All guests will be able to nominate their choice of movies.</p>
          <p v-if="nomType=='nPG' && voteStatus!='selected'">Then, rank the movie nominations in order of your viewing preference.<br/></p>

          <p v-if="nomType=='manual' && voteStatus!='selected'">You and other guests may rank these movies in order of your viewing preference.</p>

          <p>Questions? Please <a class="text-black" :href="contactAdminLink">contact {{mn.creatorName}}</a> for more info.</p>
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
    nomType() { return this.mn.nominationType },
    voteStatus() { return this.mn.voteStatus },
    contactAdminLink() { 
      let s = `sms:+1${this.mn.creatorId};?&body=`;
      const body = `hey, ${this.mn.creatorName}, question about our movie night on ${this.mn.date.monthName} ${this.mn.date.day}: `;
      s += encodeURIComponent(body);
      return s;
    },
  },
};
</script>


