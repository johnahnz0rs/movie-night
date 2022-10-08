<template>
  <!-- phase 1: create event (date, location, time) -->
    <!-- create a new node in dbase (use unique id in dbase/movie-nights/{id}) = { admin: userId, date: dateString, time: timeString, attendees: {listOfEmails}, voted: Bool } -->
  <!-- phase 2: admin can add movie noms -->
    <!-- dbase/movie-nights/{id}/nominations/{nomination_id} = { movieObject } -->
    <!-- dbase/movie-nights/{id}/votes = { movieId: voteCount, movieId: voteCount, ... } -->
  <h1>Create New Movie Night</h1>

  <div id="create-new-form">
    <v-form @submit.prevent="submitNewMovieNight">
      
      

      <!-- phase 1: event details -->
      <!-- phase 1: event details -->
      <!-- phase 1: event details -->
      <div v-if="view == 1" id="event-details">
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Event Name" v-model="eventName"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select variant="outlined" :items="months" label="Month" v-model="month"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select variant="outlined" :items="days" label="Day" v-model="day"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select variant="outlined" :items="years" label="Year" v-model="year"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select variant="outlined" :items="hours" label="hour" v-model="hour"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select variant="outlined" :items="minutes" label="min" v-model="minute"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select variant="outlined" :items="meridians" label="AM/PM" v-model="meridian"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Location / Address" v-model="location"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="nextPhase">Next</v-btn>
          </v-col>
        </v-row>
      </div>




      <!-- phase 2: invite friends -->
      <!-- phase 2: invite friends -->
      <!-- phase 2: invite friends -->
      <div v-else-if="view == 2" id="event-invite-friends">
        <v-row>
          <v-col>
            <p>phase 2 - invite your friends</p>
          </v-col>
        </v-row>

        <v-row v-for="(friend, index) in friends" :key="index">
          <v-col cols="1">{{ index + 1 }}.</v-col>
          <v-col>
            <!-- <span>lol</span> -->
            <v-text-field v-model="friends[index].contact" placeholder="phone number" type="number"></v-text-field>
          </v-col>
          <v-col cols="2" @click="removeFriend(index)" class="remove-friend">remove</v-col>
        </v-row>

        <v-row>
          <v-col class="invite-another-friend">
            <v-btn @click="anotherFriend" variant="outlined" color="green">Invite another Friend</v-btn>
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







      <!-- phase 3: noms per friend -->
      <!-- phase 3: noms per friend -->
      <!-- phase 3: noms per friend -->
      <div v-else-if="view == 3" id="event-nominations">
        <v-row>
          <v-col>
            <p>phase 3 - how many movies can each person nominate? (1-3)</p>
            <v-slider v-model="nomsPerFriend" 
              :ticks="nomsPerFriendTickLabels"
              :max="2"
              step="1"
              show-ticks="always"
              tick-size="5"
            ></v-slider>
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




      <!-- phase 4: review & send -->
      <div v-else-if="view == 4" id="event-review">
        <v-row>
          <v-col>
            <p>phase 4 - review event & send</p>
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <h2>{{ eventName.length > 0 ? eventName : 'Movie Night' }}</h2>
            <p>{{ location }}</p>
            <p>{{ month }} {{ day }}, {{ year }} @ {{ hour }}:{{ minute }} {{ meridian }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p>each person can nominate up to {{ nomsPerFriend + 1 }} movie{{ nomsPerFriend == 0 ? '' : 's'}}</p>
            <p>sending invites to:</p>
            <ul>
              <li v-for="(friend, index) in friends" :key="index">
                {{ friend.contact }}
              </li>
            </ul>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn @click="prevPhase">Prev</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="sendInvites">send invites</v-btn>
          </v-col>
        </v-row>
      </div>



      

      
    </v-form>
  </div>




</template>
<script>
// import firebase from 'firebase/compat/app';
// $ curl 'https://api.rebrandly.com/v1/links/new?apikey=YOUR_API_KEY&destination=https://www.youtube.com/watch?v=3VmtibKpmXI&slashtag=video&domain\[id\]=8f104cc5b6ee4a4ba7897b06ac2ddcfb'
// slashtag and title are optional
export default {
  name: 'CreateEvent',
  data() {
    return {
      userId: null,
      view: 1,
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
      friends: [{ contact: '' }],
      nomsPerFriend: 0,
      nomsPerFriendTickLabels: {
        0: '1',
        1: '2',
        2: '3'
      },
    };
  },
  methods: {
    submitNewMovieNight() {
      console.log("you submitted the form to create a new movie night");
      console.log()
    },
    saveToLocalStorage() {
      const movieNight = {
        userId: this.userId,
        eventName: this.eventName,
        month: this.month,
        day: this.day,
        year: this.year,
        hour: this.hour,
        minute: this.minute,
        meridian: this.meridian,
        location: this.location,
        friends: this.friends,
        nomsPerFriend: this.nomsPerFriend + 1,
      };
      localStorage.setItem('movieNight', movieNight);
      console.log(movieNight);
    },
    nextPhase() {
      this.saveToLocalStorage();
      this.view++;
    },
    prevPhase() {
      this.saveToLocalStorage();
      this.view--;
    },
    anotherFriend() {
      this.friends.push({ contact: '' }); 
    },
    removeFriend(index) {
      console.log(index);
      this.friends.splice(index, 1);
    },
    sendInvites() {
      console.log('sending invites!');
      // save event data to localStorage
      // save 
    }
  },
  mounted() {
    // this.user = firebase.auth().currentUser;

    this.userId = localStorage.getItem('uId');
    if(!this.userId) {
      console.log('CreateEvent > created: lol no user uId');
      this.$router.push('/auth');
    } else {
      console.log('CreateEvent > created: yes userId', this.userId);
    }
  },
};
</script>
<style scoped lang="scss">
form {
  // max-width: 380px;
  /* margin: 0 auto; */
}
.remove-friend {
  color: red;
  // font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
.invite-another-friend {
  display: flex; 
  justify-content: space-around;
  margin-bottom: 36px;
}
</style>

