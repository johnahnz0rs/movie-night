<template>
  <v-row v-if="(myPicks.length > 0)" class="pb-5">
      
    <!-- section title -->
    <v-col cols="12">
      <h4>{{customTitle ? customTitle : 'your nomination'}}</h4>
    </v-col>

    <!-- movie -->
    <v-col v-for="movie in myPicks" :key="movie.id" cols="4" class="text-center">
      
      <!-- poster & title -->
      <img :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" style="max-width: 110px;">
      <p><strong>{{movie.title}}</strong></p>
      
      <!-- remove this movie -->
      <v-btn v-if="canEdit" @click.prevent="$emit('removeMovie', movie)" size="x-small" rounded="pill" color="red">remove</v-btn>
    </v-col>
    
  </v-row>
</template>

<script>
export default {
  props: [ 'myPicks', 'editable', 'customTitle' ],
  emits: [ 'removeMovie' ],
  data() { 
    return {
      canEdit: null,
    };
  },
  computed: {
    // canEdit() {
    //   let can = false;
    //   // const canIEditMyPicks = (this.editable.toString().trim().toLowerCase() === 'true');
    //   if (this.editable.toString().trim().toLowerCase() === 'true') {
    //     can = true;
    //   }
    //   return can;
    // },
  },
  watch: {
    // editable() {
    //   this.canEdit = (this.editable.toString().toLowerCase() === 'true') ? true : false;  
    // }
  },
  created() {
    if (this.editable.toString().toLowerCase() === 'true') {
      this.canEdit = true;
    }
    this.canEdit = (this.editable.toString().toLowerCase() === 'true') ? true : false;
  },
};
</script>
