<template>
  <div>
    <h2 class="mb-3">Step 1: enter your name and number to begin</h2>
    <v-text-field label="name" v-model="name" @input="updateName"></v-text-field>
    <v-text-field label="number" placeholder="area code and phone # (no hyphens)" type="number" v-model="number" @input="updateNumber"></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      number: '',
    };
  },
  created() {
    this.name = this.$store.getters['create/creatorName'];
    this.number = this.$store.getters['create/creatorId'];
  },
  methods: {
    updateName() {
      this.$store.dispatch('create/creatorName', {creatorName: this.name});
    },
    updateNumber() {
      this.$store.dispatch('create/creatorId', {creatorId: this.number});
    },
  },
};
</script>