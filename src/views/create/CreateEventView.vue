<template>
  <v-container id="page-create">

    <v-row class="d-flex justify-center">
      <v-col :cols="pageCreateColSize">

        <!-- header -->
        <v-row><v-col>
          <h1 class="text-h2">Create a new Movie Night</h1>
        </v-col></v-row>

        <!-- step 1 | get User info -->
        <GetUser v-if="(view==1)" />

        <!-- step 2 | event info -->
        <EventInfo v-if="(view==2)" />

        <!-- step 3 | add guests -->
        <AddGuests v-if="(view==3)" />

        <!-- step 4 | noms per guest -->
        <NominationType v-if="(view==4)" />

        <!-- step 5 | review & create -->
        <ReviewCreate v-if="(view==5)" />

      </v-col>
    </v-row>
    
    <!-- footer -->
    <CreateFooter />


  </v-container>
</template>
<script>
import GetUser from './GetUser.vue';
import EventInfo from './EventInfo.vue';
import AddGuests from './AddGuests.vue';
import NominationType from './NominationType.vue';
import ReviewCreate from './ReviewCreate.vue';
import CreateFooter from './CreateFooter.vue';
export default {
  name: 'CreateEvent',
  components: {
    GetUser,
    EventInfo,
    AddGuests,
    NominationType,
    ReviewCreate,
    CreateFooter,
  },
  props: ['mn'],
  data() {
    return {
      readyToCreate: false,
    };
  },
  computed: {
    view() { return this.$store.getters['create/view'] },
    pageCreateColSize() {
      let c = '12';
      if (this.$vuetify.display.lgAndUp) {
        c = '4';
      } else if (this.$vuetify.display.mdAndUp) {
        c = '6';
      } else if (this.$vuetify.display.smAndUp) {
        c = '8';
      }

      // let c = 'screen-phone';
      // if (this.$vuetify.display.mdAndUp) {
      //   c = 'screen-laptop';
      // } else if (this.$vuetify.display.smAndUp) {
      //   c = 'screen-tablet';
      // }
      return c;
    },
  },
  created() {
    if (localStorage.creatorId && localStorage.creatorName) {
      this.$store.dispatch('create/creatorId', {creatorId: localStorage.creatorId});
      this.$store.dispatch('create/creatorName', {creatorName: localStorage.creatorName});
      this.$store.dispatch('create/view', {view: 2});
    }
  },
  methods: {
    updateReadyToCreate(val) {
      console.log('updateReadyToCreate: ', typeof(val), val);
      this.readyToCreate = val;
    }, 
  },
};
</script>

<style lang="scss">
#page-create {
  padding-bottom: 160px;
}
</style>