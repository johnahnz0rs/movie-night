<template>
  <h1>Create New Movie Night</h1>
  <!-- phase 1: create event (date, location, time) -->
    <!-- create a new node in dbase (use unique id in dbase/movie-nights/{id}) = { admin: userId, date: dateString, time: timeString, attendees: {listOfEmails}, voted: Bool } -->
  <!-- phase 2: admin can add movie noms -->
    <!-- dbase/movie-nights/{id}/nominations/{nomination_id} = { movieObject } -->
    <!-- dbase/movie-nights/{id}/votes = { movieId: voteCount, movieId: voteCount, ... } -->





  <div id="create-new-form">
    <v-form @submit.prevent="submitNewMovieNight">
      <!-- phase 1: event details -->
      <div id="event-details" v-if="formPhase == 1">
        <v-row>
          <v-col cols="12">
            <v-text-field outline placeholder="Event Name" v-model="eventName"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select :items="months" label="Month" v-model="month"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select :items="days" label="Day" v-model="day"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select :items="years" label="Year" v-model="year"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select :items="hours" label="Hour" v-model="hour"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select :items="minutes" label="Minutes" v-model="minute"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select :items="meridians" label="AM/PM" v-model="meridian"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field outline placeholder="Location / Address" v-model="location"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="nextPhase">Next</v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- phase 2: event nominations -->
      <div id="event-nominations" v-else-if="formPhase == 2">
        <v-row>
          <v-col>
            <p>phase 2 - how many movies can each person nominate?</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="prevPhase">Prev</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="nextPhase">Next</v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- phase 3: event movies -->
      <div id="event-movies" v-else-if="formPhase == 3">
        <v-row>
          <v-col>
            <p>phase 3 - how many movies you gonna watch?</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="prevPhase">Prev</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="nextPhase">Next</v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- phase 2: invite friends -->
      <div id="event-invites" v-else-if="formPhase == 4">
        <v-row>
          <v-col>
            <p>phase 4 - invite your friends</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="prevPhase">Prev</v-btn>
          </v-col>
          <!-- <v-col>
            <v-btn @click="nextPhase">Next</v-btn>
          </v-col> -->
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'CreateEvent',
  data() {
    return {
      formPhase: 1,
      eventName: '',
      month: '',
      day: '',
      year: '',
      hour: '',
      minute: '',
      meridian: '',
      location: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      years: [2022, 2023, 2024],
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ['00', '15', '30', '45'],
      meridians: ['AM', 'PM'],
    };
  },
  methods: {
    submitNewMovieNight() {
      console.log("you submitted the form to create a new movie night");
      console.log()
    },
    nextPhase() {
      this.formPhase++;
    },
    prevPhase() {
      this.formPhase--;
    }
  },
};
</script>
<style scoped>
form {
  max-width: 380px;
  /* margin: 0 auto; */
}
</style>

