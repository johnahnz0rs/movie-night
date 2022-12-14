<template>
  <div>
    <h1>TestComponent</h1>
    <!-- <v-btn></v-btn> -->

  </div>
</template>
<script>
import { ref, get } from 'firebase/database';
export default {
  props: ['db'],
  created() {
    this.doTheThing();
  },
  methods: {
    doTheThing() {
      get(ref(this.db, '/mn')).then(snapshot => {
        if(snapshot.exists()) {
          console.log('TestComponent', snapshot.val());
        }
      })
    }
  },
};
</script>