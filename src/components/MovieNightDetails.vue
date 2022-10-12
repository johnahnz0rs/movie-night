<template>
  <div>


    <h2>movieNight details</h2>


    <p><strong>created by</strong> {{ movieNight.admin.name }}</p>

    <p>
      <strong>where & when</strong> <br />
      {{ movieNight.location }} <br />
      {{ movieNight.month }} {{ movieNight.day }}, {{ movieNight.year }} @ {{ movieNight.hour}}:{{ movieNight.minute }} {{ movieNight.meridian }}
    </p>
    
    <p>
      <strong>who's invited</strong><br />
      <ul>
        <li v-for="friend in movieNight.friends" :key="friend.id">{{friend.name}}</li>
      </ul>
    </p>


  </div>
</template>

<script>
export default {
  // name: 'MovieNightDetails',
  data() {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>