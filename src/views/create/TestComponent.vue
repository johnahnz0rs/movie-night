<template>
  <div>
    <h1>lol TestComponent</h1>
    <v-btn @click.prevent="doTheThing">Do the thing</v-btn>
  </div>
</template>

<script>
import { ref, set } from 'firebase/database';
import { db } from '../../assets/db.js';
export default {
  // props: ['jDb', 'jRef', 'jSet'],
  methods: {
    doTheThing() {
      console.log('yo whatup doing the thing now');
      set(ref(db, '/mn/lolol'), {'jahn': 'leet'});
    }
  },
};
</script>