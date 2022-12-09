<template>
  <div id="admin-panel">
    
    <v-row>
      <v-col>
        <h2>Admin Panel</h2>

        <!-- if manual -->
        <!-- <div> -->
        <div v-if="(mn.nominationType == 'manual' && voteStatus != 'selected')">
          <p class="mb-1 font-weight-bold">You have submitted {{(mn.creatorNominations.length)}} movies to choose from.</p>
          <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{allGuests.length}} guests have voted</p>
          <ul class="ml-5">
            <li v-for="guest in allGuests" :key="guest.number">
              {{guest.name}} {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}
            </li>
          </ul>
          <v-btn @click.prevent="endTheVote">end the vote now</v-btn>
        </div>


        <!-- if nPG & nominating -->
        <!-- <div> -->
        <div v-if="(nominationType == 'nPG' && voteStatus == 'nominate')">
          <p class="mb-1 font-weight-bold">You allowed each guest to nominate up to {{nPG}} movie{{ nPG > 1 ? 's' : '' }}.</p>
          <p class="text-decoration-underline">{{guestsWhoHaveNominated.length}} of {{allGuests.length}} guests submitted their nomination{{ nPG > 1 ? 's' : '' }}</p>
          <ul class="ml-5">
            <li v-for="guest in allGuests" :key="guest.number">
              {{guest.name}} {{ guestsWhoHaveNominated.includes(guest.number.toString()) ? '✔️': '❓' }}
            </li>
          </ul>
          <v-btn @click.prevent="endNomsStartVote">end nominations & start the vote</v-btn>
        </div>
        
        
        <!-- if nPG & voting -->
        <!-- <div> -->
        <div v-if="(nominationType == 'nPG' && voteStatus == 'vote')">
          <p class="mb-1 font-weight-bold">Guests are choosing from {{allNominations.length}} movies.</p>
          <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{allGuests.length}} guests have voted{{ nPG > 1 ? 's' : '' }}</p>
          <ul class="ml-5">
            <li v-for="guest in allGuests" :key="guest.number">
              {{guest.name}} {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}
            </li>
          </ul>
          <v-btn @click.prevent="endTheVote">end the vote now</v-btn>
        </div>
        
        
        <!-- if voteStatus == selected -->
        <!-- <div> -->
        <div v-if="(nominationType == 'nPG' && voteStatus == 'selected')">
          <p class="mb-1 font-weight-bold">Voting has finished.</p>
        </div>






      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    nominationType() { return this.mn.nominationType },
    creatorNominations() { return this.mn.creatorNominations },
    allGuests() { return [ {name: this.mn.creatorName, number: this.mn.creatorId}, ...this.mn.allGuests] },
    nPG() { return this.mn.nomsPerGuest },
    voteStatus() { return this.mn.voteStatus },
    guestsWhoHaveNominated() { return this.mn.nominations ? Object.keys(this.mn.nominations) : [] },
    guestsWhoHaveVoted() { return this.mn.votes ? Object.keys(this.mn.votes) : [] },
    allNominations() { return this.mn.allNominations ? this.mn.allNominations : [] },
  },
  data() {
    return {};
  },
  methods: {
    endTheVote() {
      console.log('endTheVote()');
    },
    endNomsStartVote() {
      console.log('endNomsStartVote()');
    },
  },
};
</script>


<style lang="scss" scoped>
#admin-panel {
  // .v-row:first-of-type {
    background-color: yellow;
  // }
  // p { 
  //   padding-bottom: 8px;
  //   margin-bottom: 24px;
  //   border-bottom: 1px dashed black;
  // }
}
</style>


