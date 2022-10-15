<template>
  <v-row v-if="movieNight" class="mb-1">


    <v-col>

      <h2>{{ movieNight.eventName }}</h2>
      <!-- <p><strong>created by</strong> <br />{{ movieNight.admin.name }}</p> -->
      <p class="d-flex justify-space-between mb-1">
        <strong>created by</strong>
        <span>{{ movieNight.admin.name }}</span>
      </p>

      <p class="d-flex justify-space-between mb-1">
        <strong>where & when</strong> 
        <span class="text-right">
          <span class="text-decoration-underline">{{ movieNight.location }}</span>
          <br /><em>{{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}</em>
        </span>
      </p>
      
      <p class="d-flex justify-space-between mb-1">
        <strong>who's invited</strong>
        <span class="text-right">
          <span v-for="(friend, index) in movieNight.friends" :key="friend.id">
            {{friend.name}}{{ index < movieNight.friends.length - 1 ? ', ' : '' }}
          </span>
        </span>
      </p>

      <hr>
    </v-col>

    

  </v-row>
  <v-row v-else><v-col><p>lol</p></v-col></v-row>
</template>

<script>
export default {
  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>