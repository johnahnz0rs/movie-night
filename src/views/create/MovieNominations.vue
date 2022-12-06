<template>
  <div id="noms-per-guest">

    <v-row>
      <v-col>
        <h2> Step 4: movie nominations</h2>
        <v-btn @click.prevent="printData">print data</v-btn>
      </v-col>
    </v-row>

    <v-row class="bg-red-lighten-3 pb-5 pt-3">
      <v-col class="d-flex flex-column justify-space-between">
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
        <!-- use the search form, nice: api calls -->
        <NominateMovies :nominations="creatorNominations" :canStillNominate="canStillNominate" @addNom="addNomination" @removeNom="removeNomination" />
      </v-col>
    </v-row>
    
    <!-- if guests can nominate their own movies -->
    <v-row v-if="(nominationType == 'nPG')" class="mt-5">
      <v-col>
        <h2 class="mb-5">how many movies can each guest nominate?</h2>
        <v-slider :ticks="nPGTickLabels" :max="2" step="1" show-ticks="always" tick-size="6" v-model="nPG"></v-slider>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import NominateMovies from '../../components/NominateMovies.vue';
export default {
  components: {
    NominateMovies,
  },
  data() {
    return {
      nPGTickLabels: { 0: '1', 1: '2', 2: '3' },
      nominationType: null,
      creatorNominations: null,
      canStillNominate: true,
      // creatorNominations: [
      //   {dialog: false, adult: false,backdrop_path: "/iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg",genre_ids: [12, 35, 10751, 16],id: 277834,original_language: "en",original_title: "Moana",overview: "In Ancient Polynesia, when a terrible curse incurred by Maui reaches an impetuous Chieftain's daughter's island, she answers the Ocean's call to seek out the demigod to set things right.",popularity: 33.532,poster_path: "/4JeejGugONWpJkbnvL12hVoYEDa.jpg",release_date: "2016-11-23",title: "Moana",video: false,vote_average: 7.6,vote_count: 10731,},
      //   {dialog: false, adult: false,backdrop_path: "/wOLTJxfv98miIQcn0oNXq9fIgXM.jpg",genre_ids: [28, 35, 80, 53],id: 9737,original_language: "en",original_title: "Bad Boys",overview: "Marcus Burnett is a hen-pecked family man. Mike Lowry is a foot-loose and fancy free ladies' man. Both are Miami policemen, and both have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",popularity: 40.035,poster_path: "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",release_date: "1995-04-07",title: "Bad Boys",video: false,vote_average: 6.8,vote_count: 5343},
      //   {dialog: false, adult: false,backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",genre_ids: [878, 12],id: 438631,original_language: "en",original_title: "Dune",overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",popularity: 162.847,poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",release_date: "2021-09-08", title: "Dune", video: false, vote_average: 7.9, vote_count: 7793,},
      //   {dialog: false, adult: false,backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",genre_ids: [878, 12],id: 438631,original_language: "en",original_title: "Dune",overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",popularity: 162.847,poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",release_date: "2021-09-08", title: "Dune", video: false, vote_average: 7.9, vote_count: 7793,},
      // ], 
      nPG: null,
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
  watch: {
    nPG() { this.$store.dispatch('create/nomsPerGuest', {nomsPerGuest: this.nPG+1}) },
  },
  created() {
    this.nominationType = this.$store.getters['create/nominationType'];
    this.creatorNominations = this.$store.getters['create/creatorNominations'] ? this.$store.getters['create/creatorNominations'] : [];
    const nomsPerGuest = this.$store.getters['create/nomsPerGuest'];
    if (nomsPerGuest) {
      this.nPG = nomsPerGuest-1;
    } else {
      this.nPG = 0; // the watcher will update $store
    }
  },
  methods: {
    printData() {
      console.log({
        nPG: this.nPG,
        nominationType: this.nominationType,
        nominations: this.nominations,
      });
    },
    useNomType(choice) {
      this.nominationType = choice;
      this.$store.dispatch('create/nominationType', {nominationType: choice});
    },
    addNomination(data) {
      this.creatorNominations.push(data);
      this.$store.dispatch('create/creatorNominations', {creatorNominations: this.creatorNominations});
    },
    removeNomination(data) {
      const removeIndex = this.creatorNominations.indexOf(data);
      this.creatorNominations.splice(removeIndex, 1);
      this.$store.dispatch('create/creatorNominations', {creatorNominations: this.creatorNominations});
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