<template>
  <div>HeaderNav</div>
  <div id="temp-header-nav">
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div>
      <router-link to="/account">My Account</router-link>
    </div>
    <div>
      <router-link to="/">Sign Out</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderNav',
  data() {
    return {

    };
  },
};
</script>
<style scoped>
div {
  background-color: lightblue;
}
#temp-header-nav {
  display: flex;
  justify-content: flex-end;
  /* justify-content: space-between; */
}
#temp-header-nav div {
  /* display: inline-block; */
  margin: 0 12px;
}
</style>