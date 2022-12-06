<template>
  <!-- <v-row v-if="movieNight" class="mb-1"> -->
  <div v-if="movieNight" class="mb-1">

    <v-row>
      <v-col>
        <h2>{{ movieNight.eventName }}</h2>
      </v-col>
    </v-row>
    
    <v-row>
      <!-- <v-col cols="5">
        <p class="font-weight-bold">created by</p>
        <p>{{ movieNight.admin.name }}</p>
      </v-col>
      <v-col class="text-right" cols="7"> -->
      <v-col>
        <p class="font-weight-bold">where & when</p>
        <p>{{movieNight.location}} - <em>{{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}</em></p>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <p class="font-weight-bold">who's all coming?</p>
        <p>
          <span v-for="(friend, index) in movieNight.friends" :key="friend.id">
            {{friend.name}}{{ index < movieNight.friends.length - 1 ? ', ' : '' }}
          </span>
        </p>
      </v-col>
    </v-row>
    
    <v-divider class="my-3" thickness="3"></v-divider>
  </div>
  <v-row v-else><v-col><p>lol</p></v-col></v-row>
</template>

<script>
export default {
  computed: {
    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },
    // voterName() {
    //   const voterId = this.$route.params.voterId;
    //   for (let i=0; i < this.movieNight.friends.l)
    //   return true;
    // },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>