<template>
  <div id="review-create">
  
    <v-row>
      <v-col>
        <h2>Review & Create</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn @click.prevent="createMovieNight" color="green" size="large" :disabled="!canCreateMovieNight">create movie night & send invites</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-decoration-underline">When & Where</v-card-title>
          <v-card-text>
            <p>
              {{date.monthName}} {{date.day}}, {{date.year}}<br />
              <em>{{time.hour}}:{{time.min}} {{time.meridian}}</em>
            </p>
            <p>Location: {{location}}</p>
            <v-alert v-if="(!date.monthName || !date.day || !date.year || !time.hour || !time.min || !time.meridian || !location)" type="error" density="compact">Please enter all date, time, and location info.</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-decoration-underline">Guests</v-card-title>
          <v-card-text>
            <ul class="ml-5">
              <li>{{creatorName}} {{creatorId}} <strong>(organizer)</strong></li>
              <li v-for="guest in allGuests" :key="guest.number"> {{guest.name}} {{guest.number}}</li>
            </ul>
            <v-alert v-if="(!allGuests || allGuests.length < 1)" type="error" density="compact">Please invite at least 1 guest.</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-decoration-underline">Movie Nominations</v-card-title>
          <v-card-text>

            <div v-if="(nominationType == 'manual')">
              <h3 class="mb-1">Guests can choose from the following:</h3>
              <!-- display nominations -->
              <v-row v-if="creatorNominations" class="pb-5">
                <v-col v-for="nom in creatorNominations" :key="nom.id" cols="4" md="2" class="text-center">
                  <!-- movie poster & title -->
                  <img :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`" style="max-width: 110px;">
                  <p><strong>{{nom.title}}</strong></p>
                </v-col>
              </v-row>
              <v-alert v-if="(!creatorNominations || creatorNominations.length < 2)" type="error" density="compact">Please select at least 2 movies to choose from.</v-alert>
            </div>

            <div v-else-if="(nominationType == 'nPG')">
              <h3>Guests can nominate up to {{nomsPerGuest}} movies each</h3>
            </div>

            <v-alert v-if="(!nominationType)" type="error" density="compact">Please select a setting for movie nominations.</v-alert>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  
  <!-- red yellow blue -->
  
  
  
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../assets/db.js';
import { get, ref, set } from 'firebase/database';
export default {
  data() {
    return {
      canCreateMovieNight: false,
      // admin
      creatorId: null,
      creatorName: null,
      // time & place
      date: null,
      time: null,
      location: null,
      // guests
      allGuests: null,
      nomsPerGuest: null,
      // process
      nominationType: null,
      voteStatus: null, // nominate, vote, selected
      creatorNominations: null,      
    };
  },
  created() {
    // admin
    this.creatorId = this.$store.getters['create/creatorId'];
    this.creatorName = this.$store.getters['create/creatorName'];
    // time & place
    this.date = this.$store.getters['create/date'];
    this.time = this.$store.getters['create/time'];
    this.location = this.$store.getters['create/location'];
    // guests
    this.allGuests = this.$store.getters['create/allGuests'];
    this.nomsPerGuest = this.$store.getters['create/nomsPerGuest'];
    // process
    this.nominationType = this.$store.getters['create/nominationType'];
    this.creatorNominations = this.$store.getters['create/creatorNominations'];
    this.voteStatus = this.nominationType == 'manual' ? 'vote' : 'nominate';

    // validate and confirm this MN is ready to be created
    if (this.creatorId && this.creatorName && this.date.monthName && this.date.month && this.date.day && this.date.year && this.time.hour && this.time.min && this.time.meridian && this.location && (this.allGuests && this.allGuests.length > 0) && this.nominationType && ((this.nominationType == 'manual' && this.creatorNominations && this.creatorNominations.length > 1) || (this.nominationType == 'nPG' && this.nomsPerGuest)) && this.voteStatus) {
      this.canCreateMovieNight = true;
    }
  },
  methods: {
    createMovieNight() {

      // step 1: create new movieNight in dbase
      const mnId = uuidv4();
      let movieNight = {
        // people
        creatorId: this.creatorId,
        creatorName: this.creatorName,
        allGuests: [{name: this.creatorName, number: this.creatorId}, ...this.allGuests],
        // when & where
        date: this.date,
        time: this.time,
        location: this.location,
        // process
        nominationType: this.nominationType,
        creatorNominations: this.creatorNominations,
        nominations: this.nominationType == 'manual' ? [...this.creatorNominations] : null,
        nomsPerGuest: this.nomsPerGuest,
        voteStatus: this.voteStatus,
      };
      set(ref(db, `/mn/${mnId}`), movieNight);


      // step 2: add new movieNight to creator's list of createdMN's
      let newCreatedByCreator = [mnId];
      get(ref(db, `/users/${this.creatorId}/created`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const currentCreated = snapshot.val();
          newCreatedByCreator = [...newCreatedByCreator, ...currentCreated]
        } 
      }).then(() => {
        set(ref(db, `users/${this.creatorId}/created`), newCreatedByCreator);
      }).catch(error => {
        console.log(error);
      });


      // step 3: send creator to MovieNightView
      this.$router.push(`/mn/${mnId}`);

    },
  },
};
</script>

<style lang="scss" scoped>
#review-create {

  padding-bottom: 160px;


}
</style>
