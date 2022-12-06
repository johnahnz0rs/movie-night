<template>
  <div id="in-page-menu">
    <div class="in-page-item">
      <router-link to="/quick-pick">Quick Pick</router-link>
    </div>
    <div class="in-page-item">
      <router-link to="/create-event">Create New Event</router-link>
    </div>
    <div class="in-page-item">
      <router-link to="/upcoming-events">Upcoming Events</router-link>
    </div>
    <div class="in-page-item">
      <router-link to="/past-events">Past Events</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InPageMenu',
  data() {
    return {

    };
  },
}
</script>
<style scoped>
.in-page-item {
  display: inline-block;
  border: 1px solid black;
  padding: 12px 8px;
  margin: 2px 12px;
}
</style>