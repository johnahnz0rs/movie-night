<template>
  <div id="vote">


    <!-- err: there are no noms -->
    <div v-if="(!allNominations || Object.keys(allNominations).length == 0)">
      <!-- <div> -->
      <v-row><v-col>
        <p>
          There are no nominations for you to vote for.<br/>
          So you get nothing. You lose. Good day, sir.<br/>&nbsp;<br/>
          PS - jk plz ask {{ mn.creatorName }} to fix this.
        </p>
      </v-col></v-row>
    </div>


    <!-- if user has already voted -->
    <div v-if="userHasAlreadyVoted">
      <v-row><v-col>
        <p class="text-h5 bg-green-lighten-1 pa-2">You have already submitted your vote{{ (myVotes.length > 1) ? 's' : '' }}. Waiting on {{ slowpokes }} other guest{{ slowpokesPlural }}.</p>
      </v-col></v-row>
      <DisplayMyVotes :votes="myVotes" editable="false" />
    </div>


    <!-- if user has not yet voted -->
    <div v-if="!userHasAlreadyVoted">

      <!-- btn: submit myVotes -->
      <v-row><v-col>
        <h2>Next Step: voting — rank movies in order of your preference</h2>
        <p class="text-subtitle-2 mb-5">Note: You do <em>not</em> have to rank every single choice, but if you don't, then your vote <em>may not</em> count <em>if</em> there are ties.</p>
      </v-col></v-row>

      <!-- see myVotes / ranked choices -->
      <div v-if="(myVotes.length > 0)" id="my-votes">
        <v-btn @click="submitMyVotes" color="green" :disabled="(userHasAlreadyVoted || myVotes.length == 0)" class="mb-5">submit my votes</v-btn>
        <DisplayMyVotes sectionTitle="your votes" :votes="myVotes" :editable="!userHasAlreadyVoted" @removeMovie="removeVote" />
      </div>
      

      <!-- rank my choices -->      
      <div v-if="(votableNominations.length > 0)">
        <p v-if="(myVotes.length < allNominations.length)" class="text-h6 font-weight-bold mt-5 pt-3 mb-1">please select your {{movieChoiceText}} choice</p>
        <SelectMyVotes :allNominations="votableNominations" :myVotes="myVotes" @addMovie="addVote" @removeMovie="removeVote" />
      </div>
      
    </div>

  </div>
</template>

<script>
import DisplayMyVotes from '../../components/DisplayMyVotes.vue';
import SelectMyVotes from '../../components/SelectMyVotes.vue';

import { db } from '../../assets/db.js';
import { ref, set } from 'firebase/database';

export default {
  props: [ 'userId' ],
  components: {
    DisplayMyVotes,
    SelectMyVotes,
  },
  created() { 
    /**
     * this screen requires mn.alNominations to operate. otherwise the admin must reset to voteStatus: 'vote'
     *  */ 
    // if allNominations already exists
    if (this.allNominations) {
      this.votableNominations = [...this.allNominations];
      if (this.guestsWhoHaveVoted.includes(this.userId.toString()) && this.votes[this.userId].length > 0 ){
        this.myVotes = [ ...this.mn.votes[this.userId] ];
      }
    // if allNominations DNE
    } else {
      // create mnNew
      let mnNew = {...this.mn};
      // if 'manual'
      if (this.mn.nominationType == 'manual') {
        this.votableNominations = [...this.mn.allNominations];
        this.updateDbaseAndStore(mnNew);
      // else if 'nPG'
      } else if (this.mn.nominationType == 'nPG') {
        // err: there are no nominations
        if (!mnNew.nominations || Object.keys(mnNew.nominations).length == 0) {
          alert(`There are no nominations for you to vote for.\nSo you get nothing. You lose. Good day, sir.\n\nPS - jk plz ask ${mnNew.creatorName} to fix this.`);
        // there ARE nominations
        } else {
          let allNoms = [];
          let nomIds = [];
          for (let u in mnNew.nominations) {
            const usersNoms = [...mnNew.nominations[u]];
            for (let m in usersNoms) {
              const movie = {...usersNoms[m]};
              if (!nomIds.includes(movie.id)) {
                nomIds.push(movie.id);
                allNoms.push(movie);
              }
            }
          }
          mnNew.allNominations = [...allNoms];
          this.votableNominations = [...allNoms];
          this.updateDbaseAndStore(mnNew);
        }
      }
    }
  },
  data() {
    return {
      myVotes: [],
      votableNominations: [],
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    allNominations() { return this.mn.allNominations ? this.mn.allNominations : null },
    votes() { return this.mn.votes ? this.mn.votes : {} },
    guestsWhoHaveVoted() { return [...Object.keys(this.votes)] },
    totalGuestCount() { return this.mn.allGuests.length },
    userHasAlreadyVoted() { return this.guestsWhoHaveVoted.includes(this.userId.toString())  },
    movieChoiceText() {
      let t = this.myVotes.length + 1;
      if (t % 10 == 1) {
        t += 'st';
      } else if (t % 10 == 2) {
        t += 'nd';
      } else if (t % 10 == 3) {
        t += 'rd';
      } else {
        t += 'th';
      }
      return t;
    },
    slowpokes() { return this.totalGuestCount - this.guestsWhoHaveVoted.length },
    slowpokesPlural() { return (this.slowpokes > 1) ? 's' : '' },
  },
  methods: {
    updateDbaseAndStore(mnNew) {
      set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew);
      this.$store.dispatch('mn/mn', {mn: mnNew});
    },
    addVote(data) {
      // remove from votableNominations; add to myVotes
      const i = this.votableNominations.indexOf(data);
      this.votableNominations.splice(i, 1);
      this.myVotes.push(data);
    },
    removeVote(data) {
      // remove from myVotes; add to votableNominations
      const i = this.myVotes.indexOf(data);
      this.myVotes.splice(i, 1);
      this.votableNominations.push(data);
    },
    submitMyVotes() {
      console.log('submitMyVotes() started');
      console.log('myVotes: ', this.myVotes);
      let mnNew = {...this.mn};
      console.log(mnNew);
      if (!mnNew.votes) {
        mnNew.votes = {};
      }
      mnNew.votes[this.userId] = [...this.myVotes];
      if (Object.keys(mnNew.votes).length == this.totalGuestCount) {
        mnNew.voteStatus = 'selected';
      }
      this.updateDbaseAndStore(mnNew);
    },
   },
};
</script>

<style lang="scss" scoped>
#vote {
  margin-bottom: 36px;


  #my-votes {
    border: 1px solid black;
    padding: 8px;
  }
}
</style>

