<template>
  <div id="nominationType">


    <!-- header -->
    <v-row>
      <v-col>
        <h2>Step 4: movie nominations</h2>
        <h3 v-if="!this.nominationType" class="pt-5 mt-5">please choose one of the following</h3>
      </v-col>
    </v-row>


    <!-- choose a nominationType -->
    <!-- <v-row class="pb-5 pt-3 px-3"> -->
    <v-row v-if="!nominationType" class="pb-5 pt-3 px-3">
      <v-col class="d-flex flex-column justify-space-around">
        <v-btn @click.prevent="useNomType('manual')" size="x-large" :class="manualClass" class="mb-4">
          enter your own list<br/>
          of movies to choose from
        </v-btn>
        <v-btn @click.prevent="useNomType('nPG')" size="x-large" :class="nPGClass" class="mt-4">
          allow guests to nominate<br/> 
          their own movies
        </v-btn>
      </v-col>
    </v-row>


    <!-- if creator enters a list of movies -->
    <div v-if="(nominationType == 'manual')">
      <v-row>
        <v-col>
          <p class="text-h6 font-weight-bold">you opted to enter a list of movies.</p>
          <ul class="ml-5 my-3">
            <li>this means you and your friends will vote on what to watch from THIS list.</li>
            <li><span class="font-weight-bold">to build your list of movies</span>, start by entering the name of the first movie below. add two or more movies to go to the next step.</li>
            <li>once you're done building the list, click next to continue.</li>
          </ul>
          <p class="text-body-2">to allow your friends to nominate their choices instead, <span class="text-blue text-decoration-underline" @click.prevent="useNomType('nPG')">click here</span>.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DisplayMyPicks sectionTitle="your nominations" :myPicks="allNominations" @removeMovie="removeNomination" editable="true"/>
          <SelectMyPicks :nominations="allNominations" canStillNominate="true" editable="true" headerMsg="enter your movie choices now" @addMovie="addNomination" />
        </v-col>
      </v-row>
    </div>

    <div v-if="(nominationType == 'nPG')">
      <v-row>
        <v-col>
          <p class="text-h6 font-weight-bold">you opted to let your friends nominate one movie each.</p>
          <ul class="ml-5 my-3">
            <li>first, everyone nominates their choice for movie night.</li>
            <li>next, the "voting" starts. in the "voting" stage, everyone will be able to review all the nominations, and select their first choice, second choice, and so on.</li>
            <li>you, the creator, can choose to start the voting at any time — for example, if joe can't make it or brianna wants to abstain, so you want to start the voting without their nominations.</li>
          </ul>
          <p class="text-body-2">to give your guests a set list of movies to pick from instead, <span class="text-blue text-decoration-underline" @click.prevent="useNomType('manual')">click here</span>.</p>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import DisplayMyPicks from '../../components/DisplayMyPicks.vue';
import SelectMyPicks from '../../components/SelectMyPicks.vue';
export default {
  components: {
    DisplayMyPicks,
    SelectMyPicks,
  },
  created() {
    this.nominationType = this.$store.getters['create/nominationType'];
    this.allNominations = this.$store.getters['create/allNominations'] ? this.$store.getters['create/allNominations'] : [];
  },
  data() {
    return {
      nominationType: null,
      allNominations: null,
    };
  },
  computed: {
    manualClass() {
      return this.nominationType == 'manual' ? 'decide-selected' : 'decide-not-selected';
    },
    nPGClass() {
      return this.nominationType == 'nPG' ? 'decide-selected' : 'decide-not-selected';
    },
  },
  methods: {
    useNomType(choice) {
      this.nominationType = choice;
      const voteStatus = choice == 'manual' ? 'vote' : 'nominate';
      this.$store.dispatch('create/nominationType', {nominationType: choice});
      this.$store.dispatch('create/voteStatus', {voteStatus});
    },
    addNomination(data) {
      this.allNominations.push(data);
      this.$store.dispatch('create/allNominations', {allNominations: this.allNominations});
    },
    removeNomination(data) {
      const removeIndex = this.allNominations.indexOf(data);
      this.allNominations.splice(removeIndex, 1);
      this.$store.dispatch('create/allNominations', {allNominations: this.allNominations});
    },
  },
};
</script>

<style lang="scss" scoped>
.decide-selected {
  background-color: blue;
  color: white;
}
.decide-not-selected {
  background-color: transparent;
  color: black;
  border: 1px solid black;
}
</style>