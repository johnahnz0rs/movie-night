<!-- GLOBAL COMPONENT: MOVIE DETAIL W/ MODAL -->
<template>
  <div class="movie-detail">


    <!-- movie title & date -->
    <p class="movie-title">
      <span class="font-weight-bold text-h6">{{ dMovie.title }}</span> 
      <span v-if="dMovie.release_date"> ({{ dMovie.release_date.slice(0,4) }})</span>
    </p>

    <!-- movie poster -->
    <img v-if="dMovie.poster_path" class="movie-poster" :src="`https://image.tmdb.org/t/p/w154/${dMovie.poster_path}`" :alt="`{{dMovie.title}}`"><br/>

    <!-- modal: "see details" -->
    <v-dialog v-model="dMovie.dialog" fullscreen>
      <!-- activator -->
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="plain" class="mt-1">see details</v-btn>
      </template>
      <!-- modal content -->
      <v-card>
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div>
              <h2>{{dMovie.title}}</h2>
              <p class="mb-5">({{dMovie.release_date.slice(0,4)}})</p>
            </div>
            <div>
              <v-btn block @click="dMovie.dialog = false" color="red">Close</v-btn> <!-- x close modal -->
            </div>
          </div>
          <p>{{ dMovie.overview }}</p>
          <div class="d-flex justify-space-around mt-5">
            <img v-if="dMovie.poster_path" :src="`https://image.tmdb.org/t/p/w342/${dMovie.poster_path}`" />
          </div>
        </v-card-text>
        <!-- x close modal -->
        <v-card-actions>
          <v-btn block @click="dMovie.dialog = false" color="red">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  props: ['movie'],
  created() {
    let m = { ...this.movie };
    m.dialog = false;
    this.dMovie = m;
  },
  data() {
    return {
      dMovie: {},
    };
  },
};
</script>
