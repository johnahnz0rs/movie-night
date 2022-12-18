<template>
  <div id="nominate">

    

    <!-- if myNoms were already submitted -->
    <div v-if="userHasAlreadySubmittedNoms">
      <v-row><v-col>
        <p class="text-h5 bg-green-lighten-1 pa-2">You have submitted your nomination.<br/>Waiting on {{ slowpokes }} other guest{{ slowpokesPlural}} to submit theirs.</p>
      </v-col></v-row>
      <DisplayMyPicks :myPicks="myNoms" editable="false" />
    </div>
    

    <!-- if user can still nominate movies -->
    <div v-if="!userHasAlreadySubmittedNoms">

      <!-- btn: submit myNoms -->
      <v-row><v-col>
        <h2>Next Step: nominate a movie</h2>
        <p>(the ranked choice <em>voting</em> is coming soon)</p>
        <v-btn v-if="canSubmitMyNoms" @click.prevent="submitMyNoms" class="my-5" color="green">submit my nomination</v-btn>
      </v-col></v-row>

      <!-- see myNoms -->
      <DisplayMyPicks :myPicks="myNoms" :editable="!userHasAlreadySubmittedNoms" @removeMovie="removeNom" />

      <!-- search for/add new noms -->
      <SelectMyPicks v-if="(!userHasAlreadySubmittedNoms && myNoms.length < 1)" :nominations="myNoms" :canStillNominate="!userHasAlreadySubmittedNoms" @addMovie="addNom" @removeMovie="removeNom" />

    </div>

    

  </div>
</template>



<script>
import SelectMyPicks from '../../components/SelectMyPicks.vue';
import DisplayMyPicks from '../../components/DisplayMyPicks.vue';

import { db } from '../../assets/db.js';
import { ref, set } from 'firebase/database';
export default {
  props: [ 'userId' ],
  components: {
    SelectMyPicks,
    DisplayMyPicks,
  },
  created() {
    // check if all nominations are in
    if (this.guestsWhoHaveNominated.length == this.totalGuestCount) {
      // update the voteStatus to 'vote'
      let mnNew = {...this.mn};
      mnNew.voteStatus = 'vote';
      // update dbase & $store
      set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew);
      this.$store.dispatch('mn/mn', {mn: mnNew});

    // not all noms are in; proceed to nominate
    } else {
      if (this.nominations && this.nominations[this.userId]) {
        this.myNoms = [ ...this.nominations[this.userId] ];
      }
    }
  },
  data() {
    return {
      myNoms: [],
    };
  },
  computed: {
    mn() { return this.$store.getters['mn/mn'] },
    headerMsg() { 
      return this.guestsWhoHaveNominated.includes(this.userId.toString()) ? '' : `you may nominate up to ${ this.nPG } movie${ (this.nPG > 1) ? 's' : '' }`;
    },
    nominations() {
      return this.mn.nominations ? this.mn.nominations : {};
    },
    totalGuestCount() { return this.mn.allGuests.length },
    guestsWhoHaveNominated() { return this.nominations ? Object.keys(this.nominations) : [] },
    userHasAlreadySubmittedNoms() { return this.guestsWhoHaveNominated.includes(this.userId.toString()) },
    canSubmitMyNoms() { return !this.guestsWhoHaveNominated.includes(this.userId) && this.myNoms.length > 0 },
    canStillNominate() { return this.guestsWhoHaveNominated.includes(this.userId) ? false : true },
    slowpokes() { return parseInt(this.totalGuestCount) - this.guestsWhoHaveNominated.length },
    slowpokesPlural() { return this.slowpokes > 1 ? 's' : '' },
  },
  methods: {
    addNom(data) {
      this.myNoms.push(data);
    },
    removeNom(data) {
      const i = this.myNoms.indexOf(data);
      this.myNoms.splice(i, 1);
    },
    submitMyNoms() {
      // create new mn object
      let mnNew = {...this.mn};
      if (!mnNew.nominations) {
        mnNew.nominations = {};
      }
      mnNew.nominations[this.userId] = this.myNoms;

      // if all guests have voted:
      if (Object.keys(mnNew.nominations).length == this.totalGuestCount) {

        // update voteStatus
        mnNew.voteStatus = 'vote';
      }

      // update dbase & $store
      set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew);
      this.$store.dispatch('mn/mn', {mn: mnNew});
      
    },
  },
};
</script>



<style lang="scss" scoped>
#nominate {
  // margin: 24px 0;
  // padding-bottom: 400px;
}
</style>

