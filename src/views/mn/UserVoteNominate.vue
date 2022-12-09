<template>
  <div id="nominate">

    <!-- if myNoms were already submitted -->
    <div v-if="userHasAlreadySubmittedNoms">
      <v-row><v-col>
        <h4>Thank you. You have submitted your nomination{{ (myNoms.length > 1) ? 's' : '' }}. Waiting on {{ slowpokes }} other guest{{ (slowpokes > 1) ? 's' : '' }}.</h4>
      </v-col></v-row>
      <DisplayMyPicks :sectionTitle="displayMyPicksSectionTitle" :myPicks="myNoms" :editable="false" />
    </div>
    


    <!-- if user can still nominate movies -->
    <div v-if="!userHasAlreadySubmittedNoms">

      <!-- btn: submit myNoms -->
      <v-row><v-col>
        <v-btn v-if="canSubmitMyNoms" @click.prevent="submitMyNoms" class="mb-5" color="green">submit my nominations</v-btn>
        <h2>you can nominate up to {{nPG}} movie{{ (nPG > 1) ? 's' : '' }}</h2>
      </v-col></v-row>

      <!-- see my nominations -->
      <DisplayMyPicks :sectionTitle="displayMyPicksSectionTitle" :myPicks="myNoms" :editable="canSubmitMyNoms" @removeMovie="removeNom" />

      <!-- search for/ add new noms -->
      <div v-if="(!userHasAlreadySubmittedNoms && myNoms.length < nPG)">
        <SelectMyPicks :nominations="myNoms" :canStillNominate="!userHasAlreadySubmittedNoms" :editable="canSubmitMyNoms" :headerMsg="headerMsg" @addMovie="addNom" @removeMovie="removeNom" />
      </div>

    </div>

    

  </div>
</template>



<script>
import SelectMyPicks from '../../components/SelectMyPicks.vue';
import DisplayMyPicks from '../../components/DisplayMyPicks.vue';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = { apiKey: process.env.VUE_APP_FIREBASE_API_KEY, authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN, databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL, projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID, storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET, messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID, appId: process.env.VUE_APP_FIREBASE_APP_ID, measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default {
  props: [ 'userId' ],
  components: {
    SelectMyPicks,
    DisplayMyPicks,
  },
  created() {
    // check if all nominations are in
    if (this.guestsWhoHaveNominated.length == this.totalGuestCount) {
      let mnNew = {...this.mn};
      mnNew.voteStatus = 'vote';
      // update dbase & $store
      set(ref(db, `/mn/${this.$route.params.mnId}`), mnNew);
      this.$store.dispatch('mn/mn', {mn: mnNew});

    // not all noms are in; proceed to nominate
    } else {
      if (this.nominations[this.userId]) {
        this.myNoms = this.nominations[this.userId];
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
    nPG() { return this.mn.nomsPerGuest },
    totalGuestCount() { return this.mn.allGuests.length + 1 },
    guestsWhoHaveNominated() { return Object.keys(this.nominations) },
    userHasAlreadySubmittedNoms() { return this.guestsWhoHaveNominated.includes(this.userId.toString()) },
    canSubmitMyNoms() {
      let can = true;
      if (this.mn.nominations && this.mn.nominations[this.userId]) {
        can = false;
      }
      if (this.myNoms.length < 1) {
        can = false;
      }
      return can;
    },
    canStillNominate() { 
      // return this.canSubmitMyNoms && this.nPG > this.myNoms.length;
      let can = false;
      if (!this.guestsWhoHaveNominated.includes(this.userId)) {
        if (this.nPG > this.myNoms.length) {
          can = true;
        }  
      }
      return can;
    },
    slowpokes() { return this.totalGuestCount - this.guestsWhoHaveNominated.length },
    displayMyPicksSectionTitle() {
      return `your nomination${ (this.myNoms.length > 1) ? 's' : '' }`;
    }
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

        // // update allNominations
        // let allNoms = [];
        // for (let u in mnNew.nominations) {
        //   console.log(mnNew.nominations[u]);
        //   for (let m in mnNew.nominations[u]) {
        //     if (!allNoms.includes(mnNew.nominations[u][m])) {
        //       allNoms.push(mnNew.nominations[u][m]);
        //     }
        //   }
        // }
        // mnNew.allNominations = allNoms;
        
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
  // background-color: purple;
  // color: white;
  margin: 24px 0;
}
</style>

