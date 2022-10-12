<template>
  <div v-if="votes" class="mb-3">

    <v-row>
      <v-col>
        <h2>my nominations</h2>
        <p id="noms-per-friend">everyone can nominate up to {{ movieNight.nomsPerFriend }} movie{{ movieNight.nomsPerFriend > 1 ? 's' : '' }}</p>
      </v-col>
    </v-row>

    <v-row id="my-nominations">
      <div v-if="myNoms" id="my-noms">
        <v-col v-for="nom in myNoms" :key="nom.id" cols="4">
          {{ nom }}
        </v-col>
      </div>      
    </v-row>


    <v-row>
      <v-col>
        {{ votes }}
      </v-col>
    </v-row>












    <!-- <h2>nominations</h2>
    <p>nomsFinished: {{ votes.nomsFinished }}</p>
    <p>let the friend see current list of nominations</p>
    <p>let the friend nominate their own choices</p>
    <p>use movieNight.nomsPerFriend</p> -->
  </div>
  <!-- <div v-else class="outlined"> -->
  <!-- <div>
    <h2>nominations are finished</h2>
    <p>please vote instead</p> 
  </div> -->
</template>

<script>
export default{
  // props: ['votes'],
  // data() {
  //   return {
  //     votes: null,
  //   }
  // },
  // mounted() {
  //   this.votes = this.$store.getters['votes/votes'];
  // },
  computed: {
    votes() {
      return this.$store.getters['votes/votes'];
    },
    movieNight() {
      return this.$store.getters['events/movieNight'];
    },
    myId() {
      return this.$route.params.myId;
    },
    myNoms() {
      // return this.votes.nominations[this.myId];
      let tempNoms = {
        firstChoice: {},
        secondChoic: {},
        thirdChoice: {},
      };
      if ( Object.prototype.hasOwnProperty.call(this.votes, 'nominations') ) {
        if ( Object.prototype.hasOwnProperty.call(this.votes.nominations, this.myId) ) {
          tempNoms = this.votes.nominations[this.myId];
        }
      }
      return tempNoms;
    },
  },
};
</script>

<style lang="scss" scoped>
#noms-per-friend {
  margin-top: -8px;
}

// #my-nominations {
//   // border: 1px solid black;
// }
</style>

