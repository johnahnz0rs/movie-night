<template>
  <div id="add-guests">

    <v-row>
      <v-col>
        <h2>Step 3: invite some friends</h2>
      </v-col>
    </v-row>

    <v-row v-for="(guest, i) in allGuests" :key="i" class="guest">
      <v-col cols="12" class="d-flex justify-space-between">
        <h4>guest # {{(i+1)}}</h4>
        <h5 @click="deleteGuest(i)" class="text-red">delete</h5>
      </v-col>
      <v-col>
        <v-text-field label="name" v-model="allGuests[i].name" @input="updateGuests"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="number" placeholder="area code + phone # (no hyphens)" type="number" v-model="allGuests[i].number" @input="updateGuests"></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-3">
      <v-col class="d-flex justify-center">
        <v-btn @click.prevent="anotherGuest" variant="outlined" color="blue">add another guest</v-btn>
      </v-col>
    </v-row>


    
  </div>
</template>

<script>
export default {
  data() {
    return {
      allGuests: [],
    };
  },
  created() {
    const guests = this.$store.getters['create/allGuests'];
    if (guests) {
      this.allGuests = guests;
    } else {
      this.allGuests = [{
        name: '',
        number: '',
      }];
    }
  },
  methods: {
    anotherGuest() {
      this.allGuests.push({
        name: '',
        number: '',
      });
    },
    deleteGuest(i) {
      this.allGuests.splice(i, 1);
    },
    updateGuests() {
      this.$store.dispatch('create/allGuests', {allGuests: this.allGuests});
    },
  },
};
</script>

<style lang="scss" scoped>
#add-guests {
  .guest {
    border-radius: 4px;
    border: 1px solid black;
    margin: 8px
  }
}
</style>

