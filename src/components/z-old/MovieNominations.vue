<template>
  <v-row v-if="nominations">
      <v-col cols="12">
        <h4>nominations</h4>
      </v-col>
      <v-col v-for="nom in nominations" :key="nom.id" cols="4" md="2" class="text-center">
        <!-- movie poster & title -->
        <img :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`" style="max-width: 110px;">
        <p><strong>{{nom.title}}</strong></p>
        <!-- remove this nom -->
        <v-btn @click="$emit('removeNom', nom)" size="x-small" rounded="pill" color="red">remove</v-btn>
      </v-col>
    </v-row>
    <!-- <v-row v-else><v-col><p>no nominations</p></v-col></v-row> -->
</template>


<script>
export default {
  props: ['nominations'],
};
</script>

