<template>
  <div id="review-create">
  
    <!-- header -->
    <v-row><v-col>
      <h2>Review & Create</h2>
    </v-col></v-row>

    <!-- btn: createMovieNight() -->
    <v-row class="mt-2 mb-5">
      <v-col class="text-center">
        <v-btn @click.prevent="createMovieNight" color="green" size="large" :disabled="!canCreateMovieNight">create movie night & send invites</v-btn>
      </v-col>
    </v-row>

    <!-- when & where -->
    <v-row><v-col><v-card>
      <v-card-title class="text-decoration-underline">When & Where</v-card-title>
      <v-card-text>
        <p>
          {{date.monthName}} {{date.day}}, {{date.year}}<br />
          <em>{{time.hour}}:{{time.min}} {{time.meridian}}</em>
        </p>
        <p>Location: {{location}}</p>
        <v-alert v-if="(!date.monthName || !date.day || !date.year || !time.hour || !time.min || !time.meridian || !location)" type="error" density="compact">Please enter all date, time, and location info.</v-alert>
      </v-card-text>
    </v-card></v-col></v-row>

    <!-- guests -->
    <v-row><v-col><v-card>
      <v-card-title class="text-decoration-underline">Guests</v-card-title>
      <v-card-text>
        <ul class="ml-5">
          <li>{{creatorName}} {{creatorId}} <strong>(organizer)</strong></li>
          <li v-for="guest in allGuests" :key="guest.number"> {{guest.name}} {{guest.number}}</li>
        </ul>
        <v-alert v-if="(!allGuests || allGuests.length < 1)" type="error" density="compact">Please invite at least 1 guest.</v-alert>
      </v-card-text>
    </v-card></v-col></v-row>

    <!-- nominationType [&& allNominations] -->
    <v-row><v-col><v-card>
      <v-card-title class="text-decoration-underline">Movie Nominations</v-card-title>
      <v-card-text>

        <div v-if="(nominationType == 'manual')">
          <h3 class="mb-1">Guests can choose from the following:</h3>
          <!-- display nominations -->
          <v-row v-if="allNominations" class="pb-5">
            <v-col v-for="nom in allNominations" :key="nom.id" cols="4" class="text-center">
              <!-- movie poster & title -->
              <img :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`" style="max-width: 110px;">
              <p><strong>{{nom.title}}</strong></p>
            </v-col>
          </v-row>
          <v-alert v-if="(!allNominations || allNominations.length < 2)" type="error" density="compact">Please select at least 2 movies to choose from.</v-alert>
        </div>

        <div v-else-if="(nominationType == 'nPG')">
          <h3>Guests can nominate a movie to watch.</h3>
        </div>

        <v-alert v-if="(!nominationType)" type="error" density="compact">Please select a setting for movie nominations.</v-alert>

      </v-card-text>
    </v-card></v-col></v-row>

    <!-- btn: createMovieNight() -->
    <v-row class="mt-5">
      <v-col class="text-center">
        <v-btn @click.prevent="createMovieNight" color="green" size="large" :disabled="!canCreateMovieNight">create movie night & send invites</v-btn>
      </v-col>
    </v-row>
  
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../assets/db.js';
import { get, ref, set } from 'firebase/database';
export default {
  // props: ['mn'],
  data() {
    return {
      canCreateMovieNight: false,
    };
  },
  computed: {
    creatorId() { return this.$store.getters['create/creatorId'] },
    creatorName() { return this.$store.getters['create/creatorName'] },
    date() { return this.$store.getters['create/date'] },
    time() { return this.$store.getters['create/time'] },
    location() { return this.$store.getters['create/location'] },
    allGuests() { 
      const guests = [...this.$store.getters['create/allGuests']];
      let cleanedGuests = [];
      for (let i in guests) {
        const guest = guests[i];
        if (guest.name.trim().length > 0 && guest.number) {
          cleanedGuests.push(guest);
        }
      }
      return cleanedGuests;
    },
    nominationType() { return this.$store.getters['create/nominationType'] },
    allNominations() { return this.$store.getters['create/allNominations'] },
    voteStatus() { return this.$store.getters['create/voteStatus'] },
  },
  created() {
    // validate and confirm this MN is ready to be created
    if (this.creatorId 
    && this.creatorName 
    && this.date.monthName && this.date.month && this.date.day && this.date.year 
    && this.time.hour && this.time.min && this.time.meridian 
    && this.location 
    && (this.allGuests && this.allGuests.length > 0) 
    && this.nominationType && ( (this.nominationType == 'manual' && this.allNominations && this.allNominations.length > 1) || (this.nominationType == 'nPG') ) 
    && this.voteStatus) {
      this.canCreateMovieNight = true;
    }
  },
  methods: {
    createMovieNight() {
      // step 1: create new movieNight in dbase
      const mnId = uuidv4();
      const movieNight = {
        // people
        creatorId: this.creatorId,
        creatorName: this.creatorName,
        allGuests: [
          {
            name: this.creatorName, 
            number: this.creatorId
          }, 
          ...this.allGuests
        ],
        // when & where
        date: this.date,
        time: this.time,
        location: this.location,
        // process
        nominationType: this.nominationType,
        allNominations: this.nominationType == 'manual' ? [...this.allNominations] : null,
        voteStatus: this.voteStatus, // nominate, vote, selected
      };
      set(ref(db, `/mn/${mnId}`), movieNight);

      // step 2: add new movieNight to creator's list of createdMN's
      let newCreatedByCreator = [mnId];
      get(ref(db, `/users/${this.creatorId}/created`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const currentCreated = snapshot.val();
          newCreatedByCreator = [...newCreatedByCreator, ...currentCreated];
        }
        set(ref(db, `users/${this.creatorId}/created`), newCreatedByCreator);
      }).then(() => {
        // step 3: set admin role in store, then send creator to /mn/:mnId
        this.$store.dispatch('mn/userId', {userId: this.creatorId}); 
        this.$store.dispatch('mn/userName', {userName: this.creatorName});
        this.$store.dispatch('mn/userAllowed', {userAllowed: true});
        this.$store.dispatch('mn/userIsAdmin', {userIsAdmin: true});
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

