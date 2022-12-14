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
    <v-row class="pb-5 pt-3 px-3">
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
    <v-row v-if="(nominationType == 'manual')">

      <v-col>
        <DisplayMyPicks sectionTitle="your nominations" :myPicks="allNominations" @removeMovie="removeNomination" editable="true"/>
        <SelectMyPicks :nominations="allNominations" canStillNominate="true" editable="true" headerMsg="enter your movie choices now" @addMovie="addNomination" />
      </v-col>
    </v-row>

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
    const nomsPerGuest = this.$store.getters['create/nomsPerGuest'];
    if (nomsPerGuest) {
      this.nPG = nomsPerGuest-1;
    } else {
      this.nPG = 0; // the watcher will update $store
    }
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
      this.$store.dispatch('create/nominationType', {nominationType: choice});
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