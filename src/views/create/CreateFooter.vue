<template>
  <div id="create-footer" class="bg-purple px-1 w-100">
    <v-row class="d-flex justify-space-between py-auto">
      <v-col class="d-flex align-center justify-start">
        <v-btn v-if="(view > 1)" @click.prevent="prevScreen" variant="outlined" class="ml-3">prev</v-btn>
      </v-col>
      <v-col class="d-flex flex-column justify-center text-center">
        <h3 class="font-weight-bold mb-3">{{ footerText }}</h3>
        <h6>Step {{view}} of 5</h6>
      </v-col>
      <v-col class="d-flex align-center justify-end">
        <v-btn v-if="(view < 5)" :disabled="(!creatorId || !creatorName)" @click.prevent="nextScreen" variant="outlined" class="mr-3">next</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    view() { return this.$store.getters['create/view'] },
    creatorId() { return this.$store.getters['create/creatorId'] },
    creatorName() { return this.$store.getters['create/creatorName'] },
    footerText() {
      let ft = '';
      if (this.view == 1) {
        ft = 'enter your info';
      } else if (this.view == 2) {
        ft = 'movie night info';
      } else if (this.view == 3) {
        ft = 'guest list';
      } else if (this.view == 4) {
        ft = 'how many nominations?';
      } else if (this.view == 5) {
        ft = 'review';
      }
      return ft;
    },
  },
  methods: {
    prevScreen() {
      this.$store.dispatch('create/view', {view: this.view-1});
    },
    nextScreen() {
      this.$store.dispatch('create/view', {view: this.view+1});
    },
  },
};
</script>

<style lang="scss" scoped>
#create-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 148px;
  .v-row, .v-col {
    height: 100%;
  }
}
</style>