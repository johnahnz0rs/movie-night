<template>
  <div v-if="votes && votes.length > 0" class="display-my-votes">

    <v-row><v-col>
      <h4>your ranked votes</h4>
    </v-col></v-row>


    <v-row class="d-flex justify-space-betweem">
      <v-col v-for="vote in votesWithCount" :key="vote.id">
        <h4>{{vote.choiceText}}</h4>
        <!-- poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w92/${vote.poster_path}`" style="max-width: 110px;">
        <p><strong>{{vote.title}}</strong></p>
        <!-- remove this movie -->
        <v-btn v-if="canEdit" @click.prevent="$emit('removeMovie', vote)" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  props: [ 'votes', 'editable' ],
  emits: [ 'removeMovie' ],
  computed: {
    votesWithCount() {
      let votes = [...this.votes];
      for (let i in votes) {
        // let movie = {...votes[i]};
        // movie.choiceText = i + 1;
        let c = parseInt(i) + 1;
        if (c % 10 == 1) {
          c += 'st';
        } else if (c % 10 == 2) {
          c += 'nd';
        } else if (c % 10 == 3) {
          c += 'rd';
        } else {
          c += 'th';
        }
        c += ' choice';
        votes[i].choiceText = c;
      }
      return votes;
    },
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

