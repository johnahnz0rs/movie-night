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
    nthChoice() {
      let text = '';
      if (this.myVotes.length == 0) {
        text = '1st choice';
      } else if (this.myVotes.length == 1) {
        text = '2nd choice';
      } else if (this.myVotes.length == 2) {
        text = '3rd choice';
      }
      return text;
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

