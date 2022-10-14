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
            <v-text-field variant="outlined" label="Event Name (optional)" v-model="eventName" clearable></v-text-field>
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
            <v-text-field variant="outlined" label="Location / Address" v-model="location" clearable></v-text-field>
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
      <div v-else-if="view == 2" id="event-invite-friends" >


        <v-row v-for="(friend, index) in friends" :key="index">
          <v-card width="100%" variant="outlined" class="my-5">
            <v-card-item class="pb-0">
              <v-text-field v-model="friends[index].name" placeholder="friend's name" density="compact" clearable></v-text-field>
              <v-text-field v-model="friends[index].id" placeholder="friend's phone number" type="tel" density="compact" clearable></v-text-field>
            </v-card-item>
            <v-card-actions class="pt-0">
              <v-btn @click="removeFriend(index)" variant="outlined" color="red" size="small" class="ml-auto">remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>


        <v-row class="">
          <!-- <v-col class="invite-another-friend"> -->
          <v-col class="text-center">
            <v-btn @click="anotherFriend" variant="flat"><u>Invite another Friend</u></v-btn>
            <p class="mt-5 pt-5"><em>{{ Object.keys(friends).length }} friends invited</em></p>
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
              :max="4"
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

        <!-- movie night info: name, where, when -->
        <v-row>
          <v-col>
            <v-card variant="outlined">
              <v-card-item>
                <h2>{{ cleanedEventName }}</h2>
                <div v-if="location && month && day && year && hour && minute && meridian">
                  <p><strong>Where:</strong> {{ location }}</p>
                  <p><strong>When:</strong> {{ month }} {{ day }} {{ year }} @ {{ hour }}:{{ minute }} {{ meridian}}</p>
                  <p><strong><em>each person can nominate up to {{ nomsPerFriendTickLabels[nomsPerFriend] }} movie{{ nomsPerFriend == 0 ? '' : 's'}}</em></strong><br>&nbsp;</p>
                </div>
                <div v-else>
                  <p @click="view = 1" class="missing-info"><span>please enter location, date, and time</span></p>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>



        <!-- list of invitees -->
        <!-- list of invitees -->
        <!-- list of invitees -->
        <v-row>
          <v-col>
            <p v-if="hasFriendsInList" class="pb-3"><strong><em>sending invites to:</em></strong></p>
            <p v-else @click="view = 2" class="missing-info"><span>please invite at least 1 friend</span></p>

            <ol v-if="hasFriendsInList" id="review-friends" class="ml-5">
              <li v-for="(friend, index) in cleanedFriends" :key="index" class="py-2">
                {{ friend.name }} - {{ friend.id }}
              </li>
            </ol>
          </v-col>
        </v-row>


        <!-- enter admin info -->
        <!-- enter admin info -->
        <!-- enter admin info -->
        <v-row id="admin-info" class="mt-5">
          <v-col>
            <p class="mb-3">
              <strong><em>enter your name and number to invite your friend(s) and start the vote. invite link sent by text msg, boiii.</em></strong>
            </p>
            <v-text-field v-model="admin.name" @input="updateMovieNightCookies" label="Your name" density="compact"></v-text-field>
            <v-text-field v-model="admin.id" @input="updateMovieNightCookies" label="Your phone number" density="compact"></v-text-field>
          </v-col>
        </v-row>


        <v-row id="view-actions">
          <v-col>
            <v-btn @click="prevStep" variant="outlined" color="blue">Prev</v-btn>
            <v-btn @click="sendInvites" color="green" :disabled="!readyToSend">Invite Friends</v-btn>
          </v-col>
        </v-row>


        
      </div> <!-- end phase 4: review & send -- END -->
      <!-- end phase 4: review & send -- END -->
    



    </div> <!-- end #max-width -->
  </div> <!-- end #create-new-event -->




</template>
<script>
// import { mdiDelete } from '@mdi/js';
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// library.add(faPhone);

// import { aliases, fa } from 'vuetify/iconsets/fa'
// import firebase from 'firebase/compat/app';
// $ curl 'https://api.rebrandly.com/v1/links/new?apikey=YOUR_API_KEY&destination=https://www.youtube.com/watch?v=3VmtibKpmXI&slashtag=video&domain\[id\]=8f104cc5b6ee4a4ba7897b06ac2ddcfb'
// slashtag and title are optional
export default {
  // components: {
  //   FontAwesomeIcon
  // },
  name: 'CreateEvent',
  data() {
    return {
      uId: null,
      // constants
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      years: [2022, 2023, 2024],
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ['00', '15', '30', '45'],
      meridians: ['AM', 'PM'],
      nomsPerFriendTickLabels: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' },
      // movieNight meta
      view: 1,
      eventName: null,
      month: null,
      day: null,
      year: null,
      hour: null,
      minute: null,
      meridian: null,
      location: null,
      friends: [{ id: '', name: '' }],
      nomsPerFriend: 0,
      admin: { id: '', name: '' },
      // 
      
    };
  },
  computed: {
    cleanedEventName() {
      return this.eventName ? this.eventName : 'Movie Night';
    },
    // cleanedFriends used on frontend to list attendees
    cleanedFriends() {
      let cleanedFriends = [];
      for( let i = 0; i < this.friends.length; i++ ) {
        if (this.friends[i].id.length > 0 && this.friends[i].name.length > 0) {
          cleanedFriends.push(this.friends[i]);
        }
      }
      return cleanedFriends;
    },
    // cleanedFriendsWithAdmin is only used to create the movieNight object
    cleanedFriendsWithAdmin() {
      let friends = this.cleanedFriends;
      friends.push(this.admin);
      return friends;
    },
    readyToSend() {
      return this.uId && this.month && this.day && this.year && this.hour && this.minute && this.meridian && this.location && this.admin.id.length && this.hasFriendsInList;
    },
    hasFriendsInList() {
      // return this.friends[0].id.toString().length && this.friends[1].id.toString().length;
      return this.cleanedFriends.length ? true : false;
    }
  },
  methods: {
    updateMovieNightCookies() {
      console.log('***** updateMovieNightCookies() *****');
      const movieNight = {
        uIdAdmin: this.uId,
        eventName: this.eventName,
        month: this.month,
        day: this.day,
        year: this.year,
        hour: this.hour,
        minute: this.minute,
        meridian: this.meridian,
        location: this.location,
        friends: this.friends,
        nomsPerFriend: this.nomsPerFriend,
        admin: this.admin,
      };
      const cookieString = JSON.stringify(movieNight);
      this.$cookies.set('movieNight', cookieString);
      console.log(movieNight);
    },
    theMovieNightIsNow() {
      console.log('***** theMovieNightIsNow() *****');
      const today = new Date();
      this.month = this.months[today.getMonth()];
      this.day = today.getDate();
      this.year = today.getFullYear();
      let tempHour = today.getHours();
      if (tempHour == 0) {
        tempHour = 12;
      } else if (tempHour > 12) {
        tempHour = tempHour - 12;
      }
      this.hour = tempHour;
      this.minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
      this.meridian = today.getHours() < 12 ? 'AM' : 'PM';
      this.location = 'Right over there, Soonish.';
      this.updateMovieNightCookies();
      // this.view++;
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
      this.friends.push({ id: '', name: '' }); 
    },
    removeFriend(index) {
      console.log(index);
      this.friends.splice(index, 1);
    },
    sendInvites() {
      console.log('**** starting  sendInvites() *****');
      const movieNight = {
        uIdAdmin: this.uId,
        admin: this.admin, // send this so you can tell friends who created this movieNight event
        eventName: this.cleanedEventName,
        month: this.month,
        day: this.day,
        year: this.year,
        hour: this.hour,
        minute: this.minute,
        meridian: this.meridian,
        location: this.location,
        friends: this.cleanedFriendsWithAdmin,
        nomsPerFriend: this.nomsPerFriendTickLabels[this.nomsPerFriend],
      };
      console.log('dispatching 3: -- events/createEvents -- votes/createVotes -- votes/sendAlerts', movieNight);
      this.$store.dispatch('events/createEvent', movieNight);
      this.$store.dispatch('votes/createVotes', movieNight);
      this.$store.dispatch('movieNights/createMovieNight', movieNight);
      // ***** turning this off during dev 
        // so i don't create test shortlinks (limit 500 total links) *****
      // this.$store.dispatch('votes/sendAlerts', movieNight); 

      this.$cookies.remove('movieNight'); // this clears the cookies so the /create page will be a blank form jah bless
      
      this.$router.push(`votes/${movieNight.uIdAdmin}/${movieNight.year}-${movieNight.month}-${movieNight.day}-${movieNight.hour}-${movieNight.minute}-${movieNight.meridian}/${movieNight.admin.id}`);
    },
  },
  mounted() {
    // this.userId = localStorage.getItem('uId');
    if( !this.$cookies.isKey('uId') ) {
      console.log('CreateEvent > created: lol no user uId');
      this.$router.push('/auth');
    } else {
      this.uId = this.$cookies.get('uId');
      console.log('CreateEvent > created: yes userId', this.uId);
    }
    
    if( this.$cookies.isKey('movieNight') ) {
      const movieNight = this.$cookies.get('movieNight');
      this.eventName = movieNight.eventName;
      this.month = movieNight.month;
      this.day = movieNight.day;
      this.year = movieNight.year;
      this.hour = movieNight.hour;
      this.minute = movieNight.minute;
      this.meridian = movieNight.meridian;
      this.location = movieNight.location;
      this.friends = movieNight.friends;
      this.nomsPerFriend = movieNight.nomsPerFriend;
      this.admin = movieNight.admin;
      // console.log('eventName', this.eventName);
    }
      
  },
};
</script>
<style scoped lang="scss">

// material icons
/* fallback */
// @font-face {
//   font-family: 'Material Icons';
//   font-style: normal;
//   font-weight: 400;
//   src: url('../assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2') format('woff2');
// }

// .material-icons {
//   font-family: 'Material Icons';
//   font-weight: normal;
//   font-style: normal;
//   font-size: 24px;
//   line-height: 1;
//   letter-spacing: normal;
//   text-transform: none;
//   display: inline-block;
//   white-space: nowrap;
//   word-wrap: normal;
//   direction: ltr;
//   -webkit-font-feature-settings: 'liga';
//   -webkit-font-smoothing: antialiased;
// }



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

    // text
    .remove-friend {
      color: red;
      &:hover {
        cursor: pointer;
      }
    }


    // button
    // .invite-another-friend {
    //   display: flex; 
    //   justify-content: space-around;
    //   margin-bottom: 48px;
    // }

  
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

      #review-friends {
        
      }
    }



  }
}





</style>

