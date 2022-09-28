<template>
  <div id="hero">
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
<style scoped>
#hero {
  /* background-image: url('../assets/phillip-goldsberry-CtV2fhyHj6I-unsplash.jpg'); */
  background-image: url('../assets/vladimir-fedotov--w-V5GRG9-0-unsplash.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 63vh;
}
#list {
  display: flex;
  justify-content: space-around;
  margin: 48px 0;
}
</style>
