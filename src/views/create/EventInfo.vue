<template>
  <div id="event-info">

    <v-row>
      <v-col cols="12" class="text-h6">Date</v-col>
      <v-col>
        <v-select variant="outlined" :items="months" label="Month" v-model="monthName"></v-select>
      </v-col>
      <v-col>
        <v-select variant="outlined" :items="days" label="Day" v-model="day"></v-select>
      </v-col>
      <v-col>
        <v-select variant="outlined" :items="years" label="Year" v-model="year"></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-h6">Time</v-col>
      <v-col>
        <v-select variant="outlined" :items="hours" label="Hour" v-model="hour" @input="updateTime"></v-select>
      </v-col>
      <v-col>
        <v-select variant="outlined" :items="minutes" label="Min" v-model="min" @input="updateTime"></v-select>
      </v-col>
      <v-col>
        <v-select variant="outlined" :items="meridians" label="AM/PM" v-model="meridian"></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-h6">Location</v-col>
      <v-col>
        <v-text-field variant="outlined" label="Location name or Address" v-model="location" clearable @input="updateLocation"></v-text-field>
      </v-col>
    </v-row>
    

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn variant="outlined" color="blue" @click.prevent="itsRightNow">It's right now</v-btn>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // constants
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      years: [2022, 2023, 2024],
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ['00', '15', '30', '45'],
      meridians: ['AM', 'PM'],
      // form data
      monthName: '',
      month: '',
      day: '',
      year: '',
      hour: '',
      min: '',
      meridian: '',
      location: '',
    };
  },
  watch: {
    monthName() { 
      this.month = this.months.indexOf(this.monthName) + 1;
      this.updateDate(); 
    },
    day() { this.updateDate() },
    year() { this.updateDate() },
    hour() { this.updateTime() },
    min() { this.updateTime() },
    meridian() { this.updateTime() },
    location() { this.updateLocation() },
  },
  methods: {
    printData() {
      console.log({monthName: this.monthName,
      month: this.month,
      day: this.day,
      year: this.year,
      hour: this.hour,
      min: this.min,
      meridian: this.meridian,
      location: this.location});
    },
    itsRightNow() {
      const today = new Date();
      const month = today.getMonth();
      this.monthName = this.months[month];
      this.day = today.getDate();
      this.year = today.getFullYear();
      let tempHour = today.getHours();
      if (tempHour == 0) {
        tempHour = 12;
      } else if (tempHour > 12) {
        tempHour = tempHour - 12;
      }
      this.hour = tempHour;
      this.min = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
      this.meridian = today.getHours() < 12 ? 'AM' : 'PM';
      this.location = 'Here';
    },
    updateDate() {
      const newDate = {
        monthName: this.monthName,
        month: this.month,
        day: this.day,
        year: this.year,
      };
      this.$store.dispatch('create/date', {date: newDate});
    },
    updateTime() {
      const newTime = {
        hour: this.hour,
        min: this.min,
        meridian: this.meridian,
      };
      this.$store.dispatch('create/time', {time: newTime});
    },
    updateLocation() {
      this.$store.dispatch('create/location', {location: this.location});
    },
  },
  created() {
    this.location = this.$store.getters['create/location'];
    const date = this.$store.getters['create/date'];
    this.monthName = date.monthName;
    this.month = date.month;
    this.day = date.day;
    this.year = date.year;
    const time = this.$store.getters['create/time'];
    this.hour = time.hour;
    this.min = time.min;
    this.meridian = time.meridian;
  },
};
</script>

<style lang="scss" scoped>
#page-create #event-info .v-row {
  margin-bottom: 12px;
  margin-top: 12px;
  .v-col {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>

