<template>
  <v-container>


    <v-row>
      <v-col>
        <div id="hero" class="text-center px-5">
          <h2 class="mb-5">Movie Night</h2>
          <p>get together with friends —> turn on a movie —> success. Right?</p>
          <p>WRONG. spend 2 hours deciding what to watch then end up watching youtubes, whateva!</p>
          <!-- <p>WRONG.</p><p>spend 2 hours deciding what to watch then end up watching youtubes</p> -->
          <p>cut the crap. let's put it to a vote.</p>
          <!-- <v-btn><router-link to="/quick-pick">Get Started</router-link></v-btn> -->
          <!-- <v-btn><router-link to="/login">Login to Plan Your Movie Night</router-link></v-btn> -->

          <v-btn v-if="uId" variant="outlined" color="purple"><router-link to="/create">Plan Your Movie Night</router-link></v-btn>
          <v-btn v-else variant="outlined" color="purple"><router-link to="/auth">Login to Plan Your Movie Night</router-link></v-btn>
        </div>
      </v-col>
    </v-row>


    <v-row id="splash-img">
      <v-col>
        <div>
          <!-- <h1>homepage</h1>-->
          &nbsp;
        </div>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <!-- <div id="list"> -->
        <div class="d-flex justify-space-around my-5 py-5">
          <ul>
            <li>Plan a movie night</li>
            <li>Invite your friends</li>
            <li>Vote on what to watch</li>
            <li>Get the popcorn</li>
          </ul>
        </div>
        <div class="d-flex justify-space-around mb-5 pb-5">
          <p>movieNight uses <a href="https://time.com/5718941/ranked-choice-voting/#inline-ad-1" target="_blank">ranked choice voting</a> to cut the bs and get right to the movie #democracy</p>
        </div>
      </v-col>
    </v-row>


  </v-container>
  
  
  
  
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      user: null,
    };
  },
};
</script>
<style lang="scss" scoped>
#hero {
  padding-top: 12px;
  padding-bottom: 80px;
  p {
    padding: 12px 8px;
  }
  h2 {
    text-align: center;
    // margin: 0 auto;
  }
  button {
    margin-top: 36px;
  }
}
#splash-img {
  /* background-image: url('../assets/phillip-goldsberry-CtV2fhyHj6I-unsplash.jpg'); */
  background-image: url('../assets/opt-vladimir-fedotov--w-V5GRG9-0-unsplash.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  height: 63vh;
}
// #list {
//   display: flex;
//   justify-content: space-around;
//   margin: 48px 0;
// }
</style>
