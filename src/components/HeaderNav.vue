<template>
  <v-container fluid id="header-nav" class="bg-blue-lighten-3">
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <div id="brand">
          <router-link to="/" class="d-flex align-center text-black text-decoration-none"><img :src="'/assets/movienight2.png'" height="20"/><strong class="ml-1">MovieNight</strong></router-link>
        </div>

        <!-- <div id="links"> -->
          <!-- <p>lol</p> -->
        <!-- </div> -->
      </v-col>
    </v-row>

    

  </v-container>
</template>


<script>
export default {
  name: 'HeaderNav',
};
</script>
