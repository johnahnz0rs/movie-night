<template>
  <div id="vote">
    <!-- <p>userHasAlreadyVoted: {{userHasAlreadyVoted}}</p> -->

    <!-- err: there are no noms -->
    <div v-if="(!mn.nominations || Object.keys(mn.nominations).length == 0)">
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
      <v-row>
        <v-col>
          <p>Thank you. You have already submitted your vote{{ (myVotes.length > 1) ? 's' : '' }}. Waiting on {{ slowpokes }} other guest{{ (slowpokes > 1) ? 's' : '' }}.</p>
          <DisplayMyVotes sectionTitle="your votes" :votes="myVotes" editable="false" />
        </v-col>
      </v-row>
    </div>


    <!-- if user has not yet voted -->
    <div v-if="!userHasAlreadyVoted">

      <!-- display myVotes --><!-- submit myVotes -->
      <div v-if="myVotes">
        <v-row v-if="(!userHasAlreadyVoted && myVotes.length > 0)">
          <v-col><v-btn @click="submitMyVotes" color="green" :disabled="(userHasAlreadyVoted || myVotes.length == 0)">submit my votes</v-btn></v-col>
        </v-row>
        <DisplayMyVotes sectionTitle="your votes" :votes="myVotes" :editable="!userHasAlreadyVoted" @removeMovie="removeVote" />
      </div>


      <!-- instructions -->
      <v-row><v-col>
        <h2 v-if="(votableNominations.length > 0 && myVotes.length < 3)">please select your {{movieChoiceText}} movie preference</h2>
      </v-col></v-row>


      <!-- select my votes -->
      <div v-if="(myVotes.length < 3 && votableNominations.length > 0)">
        <SelectMyVotes :allNominations="votableNominations" :myVotes="myVotes" @addMovie="addVote" @removeMovie="removeVote" />
      </div>

    </div>



  </div>
</template>

<script>
import DisplayMyVotes from '../../components/DisplayMyVotes.vue';
import SelectMyVotes from '../../components/SelectMyVotes.vue';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = { apiKey: process.env.VUE_APP_FIREBASE_API_KEY, authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN, databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL, projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID, storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET, messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID, appId: process.env.VUE_APP_FIREBASE_APP_ID, measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default {
  props: [ 'userId' ],
  components: {
    DisplayMyVotes,
    SelectMyVotes,
  },
  created() {
    if (this.allNominations) {
      this.votableNominations = [...this.allNominations];
      if (this.guestsWhoHaveVoted.includes(this.userId.toString()) && this.votes[this.userId].length > 0 ){
        this.myVotes = [ ...this.mn.votes[this.userId] ];
      }
    } else {
      // there is no allNominations, we must create one
      

      // create mnNew
      let mnNew = {...this.mn};

      if (this.mn.nominationType == 'manual') {
        mnNew.allNominations = [...this.mn.creatorNominations];
        this.votableNominations = [...this.mn.creatorNominations];
        this.updateDbaseAndStore(mnNew);
      } else if (this.mn.nominationType == 'nPG') {
        // err: there are no nominations
        if (!mnNew.nominations || Object.keys(mnNew.nominations).length == 0) {
          alert(`There are no nominations for you to vote for.\nSo you get nothing. You lose. Good day, sir.\n\nPS - jk plz ask ${mnNew.creatorName} to fix this.`);
        } else {
          let allNoms = [];
          for (let u in mnNew.nominations) {
            for (let m in mnNew.nominations[u]) {
              if (!allNoms.includes(mnNew.nominations[u][m])) {
                allNoms.push(mnNew.nominations[u][m]);
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
      creatorNominations: [],
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    allNominations() { return this.mn.allNominations ? this.mn.allNominations : null },
    votes() { return this.mn.votes ? this.mn.votes : {} },
    guestsWhoHaveVoted() { return [...Object.keys(this.votes)] },
    totalGuestCount() { return (this.mn.allGuests.length + 1) },
    userHasAlreadyVoted() { return this.guestsWhoHaveVoted.includes(this.userId.toString())  },
    movieChoiceText() {
      let t = '';
      if (this.myVotes.length == 0) {
        t = '1st';
      } else if (this.myVotes.length == 1) {
        t = '2nd';
      } else if (this.myVotes.length == 2) {
        t = '3rd';
      }
      return t;
    },
    slowpokes() { return this.totalGuestCount - this.guestsWhoHaveVoted },
  },
  watch: {
    // votes() {},
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
}
</style>

