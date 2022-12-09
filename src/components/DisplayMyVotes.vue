<template>
  <div class="display-my-votes">

    <v-row v-if="votes.length"><v-col>
    <!-- <v-row><v-col> -->
      <h4>{{sectionTitle}}</h4>
    </v-col></v-row>


    <v-row class="d-flex justify-space-between">

      <v-col v-if="votes[0]">
        <h4>1st choice</h4>
        <!-- poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w92/${votes[0].poster_path}`" style="max-width: 110px;">
        <p><strong>{{votes[0].title}}</strong></p>
        <!-- remove this movie -->
        <v-btn v-if="canEdit" @click.prevent="$emit('removeMovie', votes[0])" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>

      <v-col v-if="votes[1]">
        <h5>2nd choice</h5>
        <!-- poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w92/${votes[1].poster_path}`" style="max-width: 110px;">
        <p><strong>{{votes[1].title}}</strong></p>
        <!-- remove this movie -->
        <v-btn v-if="canEdit" @click.prevent="$emit('removeMovie', votes[1])" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>


      <v-col v-if="votes[2]">
        <h5>3rd choice</h5>
        <!-- poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w92/${votes[2].poster_path}`" style="max-width: 110px;">
        <p><strong>{{votes[2].title}}</strong></p>
        <!-- remove this movie -->
        <v-btn v-if="canEdit" @click.prevent="$emit('removeMovie', votes[2])" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>

    </v-row>

  </div>
</template>

<script>
export default {
  props: [ 'sectionTitle', 'votes', 'editable' ],
  emits: [ 'removeMovie' ],
  computed: {
    canEdit() {
      let can = false;
      const canIEditMyPicks = (this.editable.toString().trim().toLowerCase() === 'true');
      if (canIEditMyPicks) {
        can = true;
      }
      return can;
    },
  },
};
</script>

