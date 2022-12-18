<template>
  <div id="header-nav">
    <v-container fluid class="bg-blue-lighten-3">
      <v-row>
        <v-col class="d-flex justify-space-between align-center">
          <div id="brand">
            <router-link to="/" class="d-flex align-center text-black text-decoration-none"><img :src="'/assets/movienight2.png'" height="20"/><strong class="ml-1">MovieNight</strong></router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  name: 'HeaderNav',
};
</script>


<style lang="scss" scoped>
#header-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>
