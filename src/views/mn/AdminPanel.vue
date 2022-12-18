<template>
  <div id="admin-panel" class="bg-yellow-lighten-1 mb-3 py-3 px-3">


    <!-- header -->
    <v-row><v-col>
      <h2 class="text-center">Admin Panel</h2>
    </v-col></v-row>



    <!-- send invites -->
    <v-row class="mb-5"><v-col class="text-center">
      <p class="font-weight-bold">hi {{mn.creatorName}}. text the invite link to your guests</p>
      <v-btn @click="copyLinkToMovieNight" size="small">copy link to movie night</v-btn>
    </v-col></v-row>
    <!-- show 'send invite' button for each guest -->
    <v-row v-if="(voteStatus != 'selected')" class="mb-5 d-flex justify-center">
      <v-col v-for="guest in allGuestsSent" :key="guest.number" class="d-flex justify-center">
        <p>{{ guest.sent ? '✔️': ''}}&nbsp;</p>
        <v-btn @click="sentInvite(guest.number)" size="small"><a class="text-a-guest" :href="`sms:+1${guest.number};?&body=${smsBody}`">send invite to {{guest.name}}</a></v-btn>
      </v-col>
    </v-row>







    <!-- if nomType == 'manual' && ppl are voting -->
    <v-row v-if="(nominationType == 'manual' && voteStatus != 'selected')">
      <v-col>
        <p class="mb-1 font-weight-bold">You have submitted {{allNominations.length}} movies to choose from.</p>
        <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{allGuests.length}} guests have voted.</p>
        <ul class="ml-2 mb-5">
          <li v-for="guest in allGuests" :key="guest.number">
            {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}&nbsp;&nbsp;{{guest.name}} 
          </li>
        </ul>
        <v-btn v-if="guestsWhoHaveVoted.length > 0" class="change-vote-status" @click.prevent="endTheVote">end the vote now</v-btn>
      </v-col>
    </v-row>
    <!-- if nomType == 'manual' && selected -->
    <v-row v-if="(nominationType == 'manual' && voteStatus == 'selected')">
      <v-col>
        <p class="mb-1 font-weight-bold">Voting has finished.</p>
        <v-btn v-if="guestsWhoHaveVoted.length < allGuests.length" class="change-vote-status" @click.prevent="goBackToVote">go back to voting</v-btn>
      </v-col>
    </v-row>






    <!-- if nomType == 'nPG' && nominating -->
    <v-row v-if="(nominationType == 'nPG' && voteStatus == 'nominate')">
      <v-col>
        <p class="mb-1 font-weight-bold">You allowed each guest to nominate a movie. They are nominating their choices now.</p>
        <p class="text-decoration-underline">{{guestsWhoHaveNominated.length}} of {{allGuests.length}} guests submitted their nomination.</p>
        <ul class="ml-2 mb-5">
          <li v-for="guest in allGuests" :key="guest.number">
            {{ guestsWhoHaveNominated.includes(guest.number.toString()) ? '✔️': '❓' }}&nbsp;&nbsp;{{guest.name}} 
          </li>
        </ul>
        <DisplayMyPicks v-if="(currentNominations.length > 0)" :myPicks="currentNominations" customTitle="all nominations" editable="false" />
        <v-btn v-if="guestsWhoHaveNominated.length > 0" class="change-vote-status" @click.prevent="endNomsStartVote">end nominations now & start the vote</v-btn>
      </v-col>
    </v-row>
    <!-- if nomType == 'nPG' && voting -->
      <div v-if="(nominationType == 'nPG' && voteStatus == 'vote')">
        <div class="d-flex justify-space-around mb-5">
          <p class="mb-1 font-weight-bold">Guests are now voting / ranking their choices between {{allNominations.length}} movies.</p>
          <p @click.prevent="refreshMN" class="text-decoration-underline">refresh</p>
        </div>
        <p class="text-decoration-underline">{{guestsWhoHaveVoted.length}} of {{allGuests.length}} guests have voted</p>
        <ul class="ml-2 mb-5">
          <li v-for="guest in allGuests" :key="guest.number">
            {{ guestsWhoHaveVoted.includes(guest.number.toString()) ? '✔️': '❓' }}&nbsp;&nbsp;{{guest.name}} 
          </li>
        </ul>
        <v-btn v-if="(guestsWhoHaveNominated.length < allGuests.length)" class="change-vote-status" @click.prevent="goBackToNominate">go back to nominating movies</v-btn>
        <v-btn v-if="guestsWhoHaveVoted.length > 0" class="change-vote-status" @click.prevent="endTheVote">end the vote now & reveal the winner</v-btn>
      </div>
    <!-- if nomType == 'nPG' && selected -->
    <v-row v-if="(nominationType == 'nPG' && voteStatus == 'selected')">
      <v-col>
        <p class="mb-1 font-weight-bold">Voting has finished.<br/>Hope you enjoy your movie night!</p>
        <v-btn v-if="guestsWhoHaveVoted.length < allGuests.length" class="change-vote-status" @click.prevent="goBackToVote">go back to voting</v-btn>
      </v-col>
    </v-row>



  </div>
</template>

<script>
import { db } from '../../assets/db.js';
import { get, ref, set } from 'firebase/database';
import DisplayMyPicks from '../../components/DisplayMyPicks.vue';
export default {
  created() {
    for (let i in this.allGuests) {
      const guest = this.allGuests[i];
      if (guest.number != this.mn.creatorId) {
        const guestWithSent = { sent: false, ...guest };
        this.allGuestsSent.push(guestWithSent);
      }
    }
  },
  components: {
    DisplayMyPicks,
  },
  data() {
    return {
      allGuestsSent: [],
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    allGuests() { return this.mn.allGuests },
    nominationType() { return this.mn.nominationType },
    allNominations() { return this.mn.allNominations ? this.mn.allNominations : [] },
    currentNominations() {
      let noms = [];
      if (this.mn.nominations) {
        for (let i in this.mn.nominations) {
          const movie = this.mn.nominations[i][0];
          noms.push(movie);
        }
      }
      return noms;
    },
    voteStatus() { return this.mn.voteStatus },
    guestsWhoHaveNominated() { return this.mn.nominations ? Object.keys(this.mn.nominations) : [] },
    guestsWhoHaveVoted() { return this.mn.votes ? Object.keys(this.mn.votes) : [] },
    smsBody() {
      let body = '';
      if (this.voteStatus == 'vote') {
        body = `It's time to vote! Please submit your choice(s) for our movie night on ${this.mn.date.monthName} ${this.mn.date.day} (clink the link) https://movie.z0rs.org/mn/${this.$route.params.mnId}`;
      } else if (this.nominationType == 'manual' || this.voteStatus == 'nominate') {
        body = `Hello! Hope you can make it to our movie night on ${this.mn.date.monthName} ${this.mn.date.day} (clink link for details) https://movie.z0rs.org/mn/${this.$route.params.mnId}`;
      }
      return encodeURIComponent(body);
    },
  },
  methods: {
    setNewVoteStatus(newVoteStatus) {
      let mnNew = {...this.mn};
      mnNew.voteStatus = newVoteStatus;
      set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew).then(() => {
        this.$store.dispatch('mn/mn', {mn: mnNew});
      });
    },
    goBackToNominate() {
      console.log('goBackToNominate()');
      // clear mn.votes before going back to voteStatus: nominate.
      const proceed = confirm('WARNING: this will reset everyone\'s votes, and they will have to vote/rank their choices again.\n\nClick "OK" to continue, or "Cancel" to go back.');
      // alert('WARNING: this will reset everyone\'s votes, and they will have to vote/rank their choices again again');
      if (proceed) {
        let mnNew = {...this.mn};
        mnNew.votes = {};
        mnNew.allNominations = [];
        this.$store.dispatch('mn/mn', {mn: mnNew});
        this.setNewVoteStatus('nominate');
      }
    },
    endNomsStartVote() {
      console.log('endNomsStartVote()');
      this.setNewVoteStatus('vote');
    },
    goBackToVote() {
      console.log('goBackToVote()');
      // clear mn.selected before going back to voteStatus: vote
      const proceed = confirm('WARNING: this will reset the TALLYING PROCESS, which will start again from scratch when everyone is done voting/ranking their choices.\n\nClick "OK" to continue, or "Cancel" to go back.');
      // alert('WARNING: this will reset the TALLYING PROCESS, which will start again from scratch when everyone is done voting/ranking their choices. ');
      if (proceed) {
        let mnNew = {...this.mn};
        mnNew.selected = {};
        this.$store.dispatch('mn/mn', {mn: mnNew});
        this.setNewVoteStatus('vote');
      }
      
    },
    endTheVote() {
      console.log('endTheVote()');
      this.setNewVoteStatus('selected');
    },
    copyLinkToMovieNight() {
      const link = `https://movie.z0rs.org/mn/${this.$route.params.mnId}`;
      console.log('copy link', link);
      navigator.clipboard.writeText(link);
      alert(`copied the link: ${link}`);
    },
    sentInvite(guestId) {
      console.log(`sentInvite(${guestId})`);
      for (let i in this.allGuestsSent) {
        const guest = this.allGuestsSent[i];
        if (guest.number == guestId) {
          guest.sent = true;
        }
      }
    },
    refreshMN() {
      get(ref(db, `/mn/${this.$route.params.mnId}`)).then(snapshot => {
        if (snapshot.exists()) {
          const mnNew = snapshot.val();
          console.log('got fresh copy of mn', mnNew);
          this.$store.dispatch('mn/mn', {mn: mnNew});
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
#admin-panel {
  margin-left: -16px;
  margin-right: -16px;

  a.text-a-guest {
    color: black;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .change-vote-status {
    margin-bottom: 4px;
  }
}
</style>


