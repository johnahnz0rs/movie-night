<template>
  <!-- phase 1: create event (date, location, time) -->
    <!-- create a new node in dbase (use unique id in dbase/movie-nights/{id}) = { admin: userId, date: dateString, time: timeString, attendees: {listOfEmails}, voted: Bool } -->
  <!-- phase 2: admin can add movie noms -->
    <!-- dbase/movie-nights/{id}/nominations/{nomination_id} = { movieObject } -->
    <!-- dbase/movie-nights/{id}/votes = { movieId: voteCount, movieId: voteCount, ... } -->
  

  <div id="create-new-event">
    <div id="max-width">


      <div id="heading" class="text-center">
        <v-row>
          <v-col>
            <h1>Create New Movie Night</h1>
            <h2 v-if="view==1"><strong>step 1:</strong> what, where, when?</h2>
            <h2 v-else-if="view==2">step 2: invite your friends</h2>
            <h2 v-else-if="view==3">step 3: how many movies can someone nominate?</h2>
            <h2 v-else-if="view==4">step 4: review details & send</h2>
          </v-col>
        </v-row>
      </div>
        

      <!-- phase 1: event details -->
      <!-- phase 1: event details -->
      <!-- phase 1: event details -->
      <div v-if="view == 1" id="event-details">
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Event Name (optional)" v-model="eventName"></v-text-field>
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
        <v-row id="view-actions">
          <v-col>
            <v-btn @click="theMovieNightIsNow" variant="plain" color="blue">It's Right NOW</v-btn>
            <v-btn @click="nextStep" variant="outlined" color="green">Next Step</v-btn>
          </v-col>
        </v-row>
      </div>


      <!-- phase 2: invite friends -->
      <!-- phase 2: invite friends -->
      <!-- phase 2: invite friends -->
      <div v-else-if="view == 2" id="event-invite-friends">

        <v-row v-for="(friend, index) in friends" :key="index">
          <v-col cols="1">{{ index + 1 }}.</v-col>
          <v-col>
            <!-- <span>lol</span> -->
            <v-text-field v-model="friends[index].id" placeholder="phone number" type="number"></v-text-field>
          </v-col>
          <v-col cols="2" @click="removeFriend(index)" class="remove-friend">remove</v-col>
        </v-row>

        <v-row>
          <v-col id="invite-another-friend">
            <v-btn @click="anotherFriend" variant="flat"><u>Invite another Friend</u></v-btn>
          </v-col>
        </v-row>

        <v-row id="view-actions">
          <v-col>
            <v-btn @click="prevStep" variant="outlined" color="blue">Prev</v-btn>
            <v-btn @click="nextStep" variant="outlined" color="green">Next</v-btn>
          </v-col>
        </v-row>
      </div>


      <!-- phase 3: noms per friend -->
      <!-- phase 3: noms per friend -->
      <!-- phase 3: noms per friend -->
      <div v-else-if="view == 3" id="event-nominations">
        <v-row>
          <v-col>
            <v-slider v-model="nomsPerFriend" 
              :ticks="nomsPerFriendTickLabels"
              :max="2"
              step="1"
              show-ticks="always"
              tick-size="5"
            ></v-slider>
          </v-col>
        </v-row>
        
        <v-row id="view-actions">
          <v-col>
            <v-btn @click="prevStep" variant="outlined" color="blue">Prev</v-btn>
            <v-btn @click="nextStep" variant="outlined" color="green">Next</v-btn>
          </v-col>
        </v-row>
      </div>


      <!-- phase 4: review & send -->
      <!-- phase 4: review & send -->
      <!-- phase 4: review & send -->
      <div v-else-if="view == 4" id="event-review">

        <v-row>
          <v-col>
            <h2>{{ eventName ? eventName : 'Movie Night' }}</h2>
            <p v-if="location">{{ location }}</p>
            <p v-else class="missing-info"><span @click="view = 1">please enter location info</span></p>
            <p v-if="month && day && year && hour && minute && meridian">{{ month }} {{ day }}, {{ year }} @ {{ hour }}:{{ minute }} {{ meridian }}</p>
            <p v-else class="missing-info"><span @click="view = 1">please enter date & time</span></p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p><strong><em>each person can nominate up to {{ nomsPerFriend + 1 }} movie{{ nomsPerFriend == 0 ? '' : 's'}}</em></strong><br>&nbsp;</p>
            <p v-if="hasFriendsInList">sending invites to:</p>
            <p v-else class="missing-info"><span @click="view = 2">please add some friends</span></p>
            <v-list v-if="hasFriendsInList">
              <v-list-item v-for="(friend, index) in friends" :key="index">
                {{ friend.id }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row id="view-actions">
          <v-col>
            <v-btn @click="prevStep" variant="outlined" color="blue">Prev</v-btn>
            <v-btn @click="sendInvites" color="green" :disabled="!readyToSend">Invite Friends</v-btn>
          </v-col>
        </v-row>
      </div>
    



    </div> <!-- end #max-width -->
  </div> <!-- end #create-new-event -->




</template>
<script>
// import firebase from 'firebase/compat/app';
// $ curl 'https://api.rebrandly.com/v1/links/new?apikey=YOUR_API_KEY&destination=https://www.youtube.com/watch?v=3VmtibKpmXI&slashtag=video&domain\[id\]=8f104cc5b6ee4a4ba7897b06ac2ddcfb'
// slashtag and title are optional
export default {
  name: 'CreateEvent',
  data() {
    return {
      uId: null,
      view: 1,
      eventName: null,
      month: null,
      day: null,
      year: null,
      hour: null,
      minute: null,
      meridian: null,
      location: null,
      friends: [{ id: '' }, { id: '' },],
      nomsPerFriend: 0,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      years: [2022, 2023, 2024],
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ['00', '15', '30', '45'],
      meridians: ['AM', 'PM'],
      nomsPerFriendTickLabels: {
        0: '1',
        1: '2',
        2: '3'
      },
    };
  },
  computed: {
    readyToSend() {
      return this.uId && this.month && this.day && this.year && this.hour && this.minute && this.meridian && this.location;
    },
    hasFriendsInList() {
      return this.friends[0].id.toString().length && this.friends[0].id.toString().length;
    }
  },
  methods: {
    submitNewMovieNight() {
      console.log("you submitted the form to create a new movie night");
      console.log()
    },
    updateMovieNightCookies() {
      console.log('***** updateMovieNightCookies() *****');
      const movieNight = {
        uId: this.uId,
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
      // localStorage.setItem('movieNight', movieNight);
      // this.$cookies.set('movieNight', JSON.parse(movieNight));
      this.$cookies.set('movieNight', movieNight);
      console.log(movieNight);
    },
    theMovieNightIsNow() {
      console.log('***** theMovieNightIsNow() *****');
      const today = new Date();
      this.month = this.months[today.getMonth()];
      this.day = today.getDate();
      this.year = today.getFullYear();
      this.meridian = today.getHours() < 12 ? 'AM' : 'PM';
      this.hour = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
      this.minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
      this.location = 'Here, Now';
      this.updateMovieNightCookies();
      this.view++;
    },
    nextStep() {
      this.updateMovieNightCookies();
      this.view++;
    },
    prevStep() {
      this.updateMovieNightCookies();
      this.view--;
    },
    anotherFriend() {
      this.friends.push({ id: '' }); 
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
    // this.userId = localStorage.getItem('uId');
    if( !this.$cookies.isKey('uId') ) {
      console.log('CreateEvent > created: lol no user uId');
      this.$router.push('/auth');
    } else {
      this.uId = this.$cookies.get('uId');
      console.log('CreateEvent > created: yes userId', this.uId);
      this.eventName = this.$cookies.isKey('eventName') ? this.$cookies.get('eventName') : null;
      this.month = this.$cookies.isKey('month') ? this.$cookies.get('month') : null;
      this.day = this.$cookies.isKey('day') ? this.$cookies.get('day') : null;
      this.year = this.$cookies.isKey('year') ? this.$cookies.get('year') : null;
      this.hour = this.$cookies.isKey('hour') ? this.$cookies.get('hour') : null;
      this.minute = this.$cookies.isKey('minute') ? this.$cookies.get('minute') : null;
      this.meridian = this.$cookies.isKey('meridian') ? this.$cookies.get('meridian') : null;
      this.location = this.$cookies.isKey('location') ? this.$cookies.get('location') : null;
      this.friends = this.$cookies.isKey('friends') ? this.$cookies.get('friends') : [{ id: '' }, { id: '' },];
      this.nomsPerFriend = this.$cookies.isKey('nomsPerFriend') ? this.$cookies.get('nomsPerFriend') : 0;
    }
  },
};
</script>
<style scoped lang="scss">
#create-new-event {
  display: flex;
  justify-content: space-around;
  
  h1 {
    font-size: 1.3em;
    text-decoration: underline;
  }
  h2 {
    font-size: 1.75em;
  }
  #max-width {
    max-width: 700px;
    padding: 8px;


    #heading .v-row {
      padding: 18px 0;
    }


    .remove-friend {
      color: red;
      &:hover {
        cursor: pointer;
      }
    }


    #invite-another-friend {
      display: flex; 
      justify-content: space-around;
      margin-bottom: 48px;
    }

  
    #view-actions {
      .v-col {
        display: flex;
        justify-content: space-between;
      }
    }

    #event-nominations {
      padding: 0 12px;
      #view-actions {
        margin-top: 24px;
      }
    }

    #event-review {
      .missing-info {
        border: 1px solid red;
        background-color: rgba(255,0,0,0.6);
        padding: 0 8px;
        margin: 4px 0;
      }
    }



  }
}


</style>

