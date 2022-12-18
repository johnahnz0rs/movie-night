<template>
  <div id="select-my-votes">
    <v-row>
      <v-col v-for="movie in allNominations" :key="movie.id">
        
        <!-- show movie poster, title, more-info-modal -->
        <MovieDetailWithModal :movie="movie" />

        <!-- add button -->
        <v-btn @click="$emit('addMovie', movie)" color="green" class="text-darken-2" :disabled="hasMovieAlreadyBeenSelected(movie.id)">
          {{ hasMovieAlreadyBeenSelected(movie.id) ? 'voted' : nthChoice }}
        </v-btn>

      </v-col>
    </v-row>    
  </div>
</template>


<script>
import MovieDetailWithModal from './MovieDetailWithModal.vue';
export default {
  props: [ 'allNominations', 'myVotes' ],
  emits: [ 'addMovie', 'removeMovie' ],
  components: {
    MovieDetailWithModal,
  },
  data() {
    return {
      // nominations: [],
    };
  },
  computed: {
    myVotesIds() {
      let list = [];
      if (this.myVotes.length > 0) {
        list = Array.from(this.myVotes, movie => movie.id);
      }
      return list;
    },
    nthChoice() {let t = this.myVotes.length + 1;
      if (t % 10 == 1) {
        t += 'st';
      } else if (t % 10 == 2) {
        t += 'nd';
      } else if (t % 10 == 3) {
        t += 'rd';
      } else {
        t += 'th';
      }
      t += ' choice';
      return t;
    }
  },
  methods: {
    hasMovieAlreadyBeenSelected(id) {
      let already = false;
      if (this.myVotesIds) {
        already = this.myVotesIds.includes(id);
      }
      return already;
    },
    removeMovie(data) {
      this.$emit('removeMovie', data);
    },
  },
};
</script>


<style lang="scss" scoped>
#select-my-votes {
  padding-bottom: 160px;


  #search-result {
    .movie-title {
      min-height: 50px;
      line-height: 0.85em;;
    }
  }


}
</style>

