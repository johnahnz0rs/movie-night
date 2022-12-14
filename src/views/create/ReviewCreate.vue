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
              <h3>Guests can nominate a movie to watch</h3>
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
  props: ['mn'],
  data() {
    return {
      canCreateMovieNight: false,
      allNominations: null,
    };
  },
  computed: {
    creatorId() { return this.$store.getters['create/creatorId'] },
    creatorName() { return this.$store.getters['create/creatorName'] },
    date() { return this.$store.getters['create/date'] },
    time() { return this.$store.getters['create/time'] },
    location() { return this.$store.getters['create/location'] },
    nominationType() { return this.$store.getters['create/nominationType'] },
    voteStatus() { 
      let status = this.nominationType;
      if (status == 'manual') {
        status = 'vote';
      } else if (status == 'nPG') {
        status = 'nominate'
      }
      return status;
    },
  },
  created() {
    // validate and confirm this MN is ready to be created
    if (this.mn.creatorId 
    && this.mn.creatorName 
    && this.mn.date.monthName && this.date.month && this.date.day && this.date.year 
    && this.mn.time.hour && this.time.min && this.time.meridian 
    && this.mn.location 
    && (this.mn.allGuests && this.mn.allGuests.length > 0) 
    && this.mn.nominationType && ((this.mn.nominationType == 'manual' && this.mn.allNominations && this.mn.allNominations.length > 1) || (this.mn.nominationType == 'nPG')) 
    && this.mn.voteStatus) {
      this.canCreateMovieNight = true;
    }
  },
  methods: {
    createMovieNight() {
      // step 1: create new movieNight in dbase
      const mnId = uuidv4();
      const movieNight = {
        // people
        creatorId: this.mn.creatorId,
        creatorName: this.mn.creatorName,
        allGuests: [{name: this.mn.creatorName, number: this.mn.creatorId}, ...this.mn.allGuests],
        // when & where
        date: this.mn.date,
        time: this.mn.time,
        location: this.mn.location,
        // process
        nominationType: this.mn.nominationType,
        allNominations: this.mn.nominationType == 'manual' ? [...this.mn.creatorNominations] : null,
        voteStatus: this.mn.nominationType == 'manual' ? 'vote' : 'nominate', // nominate, vote, selected
      };
      set(ref(db, `/mn/${mnId}`), movieNight);
      // step 2: add new movieNight to creator's list of createdMN's
      let newCreatedByCreator = [mnId];
      get(ref(db, `/users/${this.creatorId}/created`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const currentCreated = snapshot.val();
          newCreatedByCreator = [...newCreatedByCreator, ...currentCreated]
          set(ref(db, `users/${this.creatorId}/created`), newCreatedByCreator);
        } 
      }).then(() => {
        // step 3: send creator to MovieNightView
        this.$router.push(`/mn/${mnId}`);
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#review-create {
  padding-bottom: 164px;
}
</style>

