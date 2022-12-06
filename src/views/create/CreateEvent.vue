<template>
  <div id="page-create">

    <v-row>
      <v-col class="text-center">
        <h1>Create a new Movie Night</h1>
        <v-btn @click.prevent="printStore">print store</v-btn>
      </v-col>
    </v-row>

    <!-- step 1 | get User info -->
    <v-row v-if="(view==1)">
      <v-col>
        <GetUser />
      </v-col>
    </v-row>

    <!-- step 2 | event info -->
    <v-row v-if="(view==2)">
      <v-col>
        <EventInfo />
      </v-col>
    </v-row>

    <!-- step 3 | add guests -->
    <v-row v-if="(view==3)">
      <v-col>
        <AddGuests />
      </v-col>
    </v-row>

    <!-- step 4 | noms per guest -->
    <v-row v-if="(view==4)">
      <v-col>
        <MovieNominations />
      </v-col>
    </v-row>

    <!-- step 5 | review & create -->
    <v-row v-if="(view==5)">
      <v-col>
        <ReviewCreate :db="db" />
      </v-col>
    </v-row>
    
    <!-- footer -->
    <CreateFooter />


  </div>
</template>
<script>
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};
import GetUser from './GetUser.vue';
import EventInfo from './EventInfo.vue';
import AddGuests from './AddGuests.vue';
import MovieNominations from './MovieNominations.vue';
import ReviewCreate from './ReviewCreate.vue';
import CreateFooter from './CreateFooter.vue';

export default {
  name: 'CreateEvent',
  components: {
    GetUser,
    EventInfo,
    AddGuests,
    MovieNominations,
    ReviewCreate,
    CreateFooter,
  },
  // props: ['db'],
  data() {
    return {
      readyToCreate: false,
      db: null,
    };
  },
  computed: {
    view() { return this.$store.getters['create/view'] },
  },
  created() {
    console.log('*** /views/create/CreateEvent.vue> created() ');
    if (localStorage.creatorId && localStorage.creatorName) {
      this.$store.dispatch('create/creatorId', {creatorId: localStorage.creatorId});
      this.$store.dispatch('create/creatorName', {creatorName: localStorage.creatorName});
      this.$store.dispatch('create/view', {view: 2});
    }
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  },
  methods: {
    updateReadyToCreate(val) {
      console.log('updateReadyToCreate: ', typeof(val), val);
      this.readyToCreate = val;
    }, 
    printStore() {
      let stuff = {
        view: this.$store.getters['create/view'],
        creatorId: this.$store.getters['create/creatorId'],
        creatorName: this.$store.getters['create/creatorName'],
        date: this.$store.getters['create/date'],
        time: this.$store.getters['create/time'],
        location: this.$store.getters['create/location'],
        allGuests: this.$store.getters['create/allGuests'],
        voteStatus: this.$store.getters['create/voteStatus'],
        nominationType: this.$store.getters['create/nominationType'],
        creatorNominations: this.$store.getters['create/creatorNominations'],
        // nominations: this.$store.getters['create/nominations'],
        nomsPerGuest: this.$store.getters['create/nomsPerGuest'],
      };
      console.log('***** printStore() ', stuff);
    }
  },
};
</script>
<style scoped lang="scss">
#page-create {
  padding: 0 8px 160px 8px; 
  margin-bottom: 160px;
  height: 100vh;
}
</style>

