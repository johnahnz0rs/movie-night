<template>
  <v-row id="admin-panel" class="bg-yellow-lighten-1 mb-3">
    <v-col>


      <!-- header -->
      <h2>Admin Panel</h2>



      <!-- if nomType == 'manual' && ppl are voting -->
      <div v-if="(nominationType == 'manual' && voteStatus != 'selected')">
        <p class="mb-1 font-weight-bold">You have submitted {{allNominations.length}} movies to choose from.</p>
        <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{mn.allGuests.length}} guests have voted.</p>
        <ul class="ml-5">
          <li v-for="guest in mn.allGuests" :key="guest.number">
            {{guest.name}} {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}
          </li>
        </ul>
        <v-btn @click.prevent="endTheVote">end the vote now</v-btn>
      </div>

      <!-- if nomType == 'manual' && selected -->
      <div v-if="(nominationType == 'manual' && voteStatus == 'selected')">
        <p class="mb-1 font-weight-bold">Voting has finished.</p>
        <v-btn @click.prevent="goBackToVote">go back to voting</v-btn>
      </div>




      <!-- if nomType == 'nPG' && nominating -->
      <div v-if="(nominationType == 'nPG' && voteStatus == 'nominate')">
        <p class="mb-1 font-weight-bold">You allowed each guest to nominate a movie.</p>
        <p class="text-decoration-underline">{{guestsWhoHaveNominated.length}} of {{mn.allGuests.length}} guests submitted their nomination.</p>
        <ul class="ml-5">
          <li v-for="guest in mn.allGuests" :key="guest.number">
            {{guest.name}} {{ guestsWhoHaveNominated.includes(guest.number.toString()) ? '✔️': '❓' }}
          </li>
        </ul>
        <v-btn @click.prevent="endNomsStartVote">end nominations now & start the vote</v-btn>
      </div>
        
      <!-- if nomType == 'nPG' && voting -->
      <div v-if="(nominationType == 'nPG' && voteStatus == 'vote')">
        <p class="mb-1 font-weight-bold">Guests are choosing from {{allNominations.length}} movies.</p>
        <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{mn.allGuests.length}} guest{{ nPG > 1 ? 's' : '' }} have voted</p>
        <ul class="ml-5">
          <li v-for="guest in mn.allGuests" :key="guest.number">
            {{guest.name}} {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}
          </li>
        </ul>
        <v-btn @click.prevent="goBackToNominate">go back to nominating movies</v-btn>
        <v-btn @click.prevent="endTheVote">end the vote now & reveal the winner</v-btn>
      </div>
      
      <!-- if nomType == 'nPG' && selected -->
      <div v-if="(nominationType == 'nPG' && voteStatus == 'selected')">
        <p class="mb-1 font-weight-bold">Voting has finished.</p>
        <v-btn @click.prevent="goBackToVote">go back to voting</v-btn>
      </div>


    </v-col>
  </v-row>
</template>

<script>
import { db } from '../../assets/db.js';
import { ref, set } from 'firebase/database';
export default {
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    nominationType() { return this.mn.nominationType },
    allNominations() { return this.mn.allNominations ? this.mn.allNominations : [] },
    voteStatus() { return this.mn.voteStatus },
    guestsWhoHaveNominated() { return this.mn.nominations ? Object.keys(this.mn.nominations) : [] },
    guestsWhoHaveVoted() { return this.mn.votes ? Object.keys(this.mn.votes) : [] },
  },
  data() {
    return {};
  },
  methods: {
    setNewVoteStatus(newVoteStatus) {
      let mnNew = {...this.mn};
      mnNew.voteStatus = newVoteStatus;
      set(ref(db, `/mn/${this.$route.params.id}`), mnNew);
    },
    goBackToNominate() {
      console.log('goBackToNominate()');
      this.setNewVoteStatus('nominate');
    },
    endNomsStartVote() {
      console.log('endNomsStartVote()');
      this.setNewVoteStatus('vote');
    },
    goBackToVote() {
      console.log('goBackToVote()');
      this.setNewVoteStatus('vote');
    },
    endTheVote() {
      console.log('endTheVote()');
      this.setNewVoteStatus('selected');
    },
  },
};
</script>




