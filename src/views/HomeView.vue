<template>
  <div id="hero">
    <h2>Movie Night</h2>
    <p>get together with friends, turn on a movie, success, right?</p>
    <p>WRONG. spend 2 hours deciding what to watch then end up watching bojack horseman wtf</p>
    <p>cut the crap. put it to a vote.</p>
    <!-- <v-btn><router-link to="/quick-pick">Get Started</router-link></v-btn> -->
    <v-btn><router-link to="/login">Login to Plan Your Movie Night</router-link></v-btn>
  </div>
  <div id="splash-img">
    <!-- <h1>homepage</h1>
     -->
  </div>
  <div id="list">
    <ul>
      <li>Plan a movie night</li>
      <li>Invite your friends</li>
      <li>Vote on what to watch</li>
      <li>Get the popcorn</li>
    </ul>
  </div>
  
  <!-- <img src="./assets/phillip-goldsberry-CtV2fhyHj6I-unsplash.jpg"> -->
  <!-- <img id="hero-img" :src="heroImg"> -->
</template>
<script>
// import heroImg from '../assets/phillip-goldsberry-CtV2fhyHj6I-unsplash.jpg';
export default {
  name: 'HomeView',
  data() {
    return {
      // heroImg,
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
  background-image: url('../assets/vladimir-fedotov--w-V5GRG9-0-unsplash.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  height: 63vh;
}
#list {
  display: flex;
  justify-content: space-around;
  margin: 48px 0;
}
</style>
