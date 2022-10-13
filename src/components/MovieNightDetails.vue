<template>
  <v-row v-if="movieNight" class="mb-3">


    <v-col>

      <h2>{{ movieNight.eventName }}</h2>
      <!-- <p><strong>created by</strong> <br />{{ movieNight.admin.name }}</p> -->
      <p class="d-flex justify-space-between mb-1">
        <strong>created by</strong>
        <span>{{ movieNight.admin.name }}</span>
      </p>

      <p class="d-flex justify-space-between mb-1">
        <strong>where & when</strong> 
        <span>{{ movieNight.location }} <br /><em>{{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}</em></span>
        <!-- <strong>where & when</strong> <br />
        {{ movieNight.location }} <br />
        <em>{{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}</em> -->
      </p>
      
      <p class="d-flex justify-space-between">
        <strong>who's invited</strong>
        <span><span v-for="(friend, index) in movieNight.friends" :key="friend.id">{{friend.name}}{{ index < movieNight.friends.length - 1 ? ', ' : '' }}</span></span>
      </p>

      <hr>
    </v-col>

    

  </v-row>
</template>

<script>
export default {
  computed: {
    movieNight() {
      return this.$store.getters['events/movieNight'];
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>