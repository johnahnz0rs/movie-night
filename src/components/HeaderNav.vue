<template>
  <div id="header-nav">

    <div id="brand">
      <router-link to="/">MovieNight</router-link>
    </div>

    <div id="links">
      <div>
        <!-- <router-link to="/quick-pick">signOut</router-link> -->
        <p @click="signOut"><u>Sign Out</u></p>
      </div>
      <div v-if="userAuth">
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
      // userAuth: true,
      userAuth: false,
    };
  },
  methods: {
    signOut() {
      // const cookieNames = this.$cookies.keys();
      console.log('**** starting signOut() ****');
      this.$cookies.set('uId', '');
      this.$cookies.remove('uId');
      console.log('**** END signOut() - sending you to homepage ****');
      this.$router.push('/');
    }
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