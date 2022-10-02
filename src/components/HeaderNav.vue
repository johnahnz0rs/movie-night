<template>
  <div id="header-nav">

    <div id="brand">
      <router-link to="/">MovieNight</router-link>
    </div>

    <div id="links">
      <div>
        <router-link to="/quick-pick">Quick Pick</router-link>
      </div>
      <div v-if="userAuth">
        <router-link to="/create-event">Create New Event</router-link>
      </div>
      <div v-if="userAuth">
        <router-link to="/upcoming-events">Upcoming Events</router-link>
      </div>
      <div v-if="userAuth">
        <router-link to="/past-events">Past Events</router-link>
      </div>
      <div v-if="userAuth">
        <router-link to="/account">My Account</router-link>
      </div>
      <div v-if="userAuth">
        <router-link to="/">Sign Out</router-link>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      userAuth: true,
    };
  },
};
</script>
<style scoped>
#header-nav {
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
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