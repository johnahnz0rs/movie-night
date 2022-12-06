<template>
  <div class="mb-1">

    <!-- <p>myVotes {{myVotes}}</p>     -->
    <v-row class="mb-1">
      <v-col v-if="!canSubmitMyVotes" cols="12" class="my-0 pb-0 text-center">
        <h3>waiting for everybody to finish voting. check back soon</h3>
      </v-col>
      <v-col cols="12" class="d-flex justify-space-between">
        <h2 class="text-decoration-underline">{{voterName}}'s Votes</h2>
        <!-- BUTTON - submit my votes -->
        <!-- <v-btn @click="submitMyVotes" color="green" :disabled="!canSubmitMyVotes">submit<br/>my votes</v-btn> -->
        <v-btn v-if="!canSubmitMyVotes" @click="submitMyVotes" color="green" disabled>submitted</v-btn>
        <v-btn v-else @click="submitMyVotes" color="green">submit<br/>my votes</v-btn>
      </v-col>
    </v-row>


    <!-- modal to double-check if voter wants to finish/submit myNoms -->
    <v-dialog v-model="submitMyVotesDialog" fullscreen persistent>
      <v-card>
        <v-card-text class="text-h5">
          <p class="text-h3 my-5">Are You Sure?</p>
          <p class="my-3">please double-check that you made a selection for each choice.</p>
          <p class="my-3">because of how <a href="https://time.com/5718941/ranked-choice-voting/#inline-ad-1" target="_blank">ranked choice voting</a> works, it's better to enter as many choices as you can, in the order that you'd prefer.</p>
          <p class="mb-5 pb-5"><strong>You cannot change your votes/preferences later.</strong></p>
          <div class="d-flex justify-space-between">
            <v-btn @click="submitMyVotesDialog = false" variant="text" color="red">Go back,<br/>change preferences</v-btn>
            <v-btn @click="reallySubmitMyVotes" variant="tonal" color="green">I'm done<br/>voting</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- myVotes -->
    <v-row class="d-flex justify-space-around mb-5">
      <!-- 1st choice -->
      <!-- <div class="d-flex justify-space-between"> -->
        <v-col class="text-center pt-0" v-if="myVotes.first" cols="4">
          <p class="text-h6"><strong>1st choice</strong></p>
          <img v-if="myVotes.first.poster_path" :src="`https://image.tmdb.org/t/p/w154/${myVotes.first.poster_path}`" width="110"><br/>
          <p><strong>{{myVotes.first.title}}</strong></p>
          <v-btn v-if="myVotes.first.id" @click="removeVote('first')" size="x-small" rounded="pill" color="red">remove</v-btn>
        </v-col>
        <!-- 2nd choice -->
        <v-col class="text-center pt-0" v-if="myVotes.second" cols="4">
          <p class="text-h6"><strong>2nd choice</strong></p>
          <img v-if="myVotes.second.poster_path" :src="`https://image.tmdb.org/t/p/w154/${myVotes.second.poster_path}`" width="110"><br/>
          <p><strong>{{myVotes.second.title}}</strong></p>
          <v-btn v-if="myVotes.second.id" @click="removeVote('second')" size="x-small" rounded="pill" color="red">remove</v-btn>
        </v-col>
        <!-- 3rd choice -->
        <v-col class="text-center pt-0" v-if="myVotes.third" cols="4">
          <p class="text-h6"><strong>3rd choice</strong></p>
          <img v-if="myVotes.third.poster_path" :src="`https://image.tmdb.org/t/p/w154/${myVotes.third.poster_path}`" width="110"><br/>
          <p><strong>{{myVotes.third.title}}</strong></p>
          <v-btn v-if="myVotes.third.id" @click="removeVote('third')" size="x-small" rounded="pill" color="red">remove</v-btn>
        </v-col>

      <!-- </div> -->
      <v-divider></v-divider>
    </v-row>


    
    <!-- make your choice(s) -->
    <!-- <v-row v-if="nomsFinal"> -->
    <v-row v-if="myNomsFinal && canStillMakeChoice">
      <v-col cols="12" class="my-0 pb-0 text-center"><p>{{nomsFinal.length}} nomination{{nomsFinal.length > 1 ? 's' : ''}}</p></v-col>
      <v-col cols="12">
        <h2>What is your {{pickYourChoice}} choice?</h2>
      </v-col>


      <!-- <v-col v-for="(nom, i) in nomsFinal" :key="nom.id" class="pb-5 mb-5 text-center" cols="6"> -->
      <v-col v-for="(nom, i) in myNomsFinal" :key="nom.id" class="pb-5 mb-5 text-center" cols="6">
        <!-- img & title -->
        <img v-if="nom.poster_path" :src="`https://image.tmdb.org/t/p/w154/${nom.poster_path}`">
        <p><strong>{{nom.title}}</strong></p>
        
        <!-- vote button -->
        <v-btn @click="voteForMovie(nom)" variant="tonal" color="green">{{voteButtonText}}</v-btn><br/>

        <!-- see details (modal) -->
        <v-dialog v-model="myNomsFinal[i].dialog" fullscreen>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="plain" class="mt-1">see details</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <h2>{{nom.title}}</h2>
              <p class="mb-5">({{nom.release_date.slice(0,4)}})</p>
              <p>{{ nom.overview }}</p>
              <div class="d-flex justify-space-around mt-5">
                <img v-if="nom.poster_path" :src="`https://image.tmdb.org/t/p/w342/${nom.poster_path}`" />
              </div>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn block @click="nomsFinal[i].dialog = false" color="red">Close</v-btn> -->
              <v-btn block @click="myNomsFinal[i].dialog = false" color="red">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>

  

    <!-- submit/finish my votes -->
    <v-row v-else-if="!canStillMakeChoice" class="text-center">
      <v-col>
        <!-- BUTTON - submit my votes -->
        <!-- <v-btn @click="submitMyVotes" color="green" :disabled="!canSubmitMyVotes">submit my votes</v-btn> -->
        <v-btn @click="submitMyVotes" color="green" :disabled="!canSubmitMyVotes">{{!canSubmitMyVotes ? 'submitted' : 'submit my votes' }}</v-btn>
      </v-col>
    </v-row>
    
    
    






  </div>
</template>


<script>
import { getDatabase, ref, update } from "firebase/database";
export default {

  data() {
    return {
      uIdAdmin: this.$route.params.uIdAdmin,
      mnId: this.$route.params.mnId,
      voterId: this.$route.params.voterId,
      submitMyVotesDialog: false,
    };
  },

  computed: {


    movieNight() {
      return this.$store.getters['movieNights/movieNight'];
    },

    voterName() {
      let voterName = '';
      const friends = this.movieNight.friends ? this.movieNight.friends : [];
      for (let i=0; i < friends.length; i++) {
        if (friends[i]) {
          if (this.voterId == friends[i].id) {
            voterName = friends[i].name;
          }
        }
      }
      return voterName;
    },

    nomsFinal() {
      return this.movieNight.nomsFinal;
    },

    // object: 1: {movie}, 2:{}, 3:{}
    myVotes() {
      let myVotes = {first:{}};

      if (this.movieNight.votes[this.voterId].first && this.movieNight.votes[this.voterId].first.id) {
        myVotes = this.movieNight.votes[this.voterId];
      } else if (this.nomsFinal.length >= 3) {
        myVotes = {first:{}, second:{}, third:{}};
      } else if (this.nomsFinal.length >= 2) {
        myVotes = {first: {}, second: {}};
      }
      return myVotes;
    },

    myNomsFinal() {
      let myNomsFinal = [];
      const nomsFinal = this.nomsFinal;
      const myVotes = this.myVotes;
      // let myVotesIds = [ myVotes.first.id, myVotes.second.id, myVotes.third.id ];
      let myVotesIds = [];
      if (myVotes.first) {
        myVotesIds.push(myVotes.first.id ? myVotes.first.id : '');
      }
      if (myVotes.second) {
        myVotesIds.push(myVotes.second.id ? myVotes.second.id : '');
      }
      if (myVotes.third) {
        myVotesIds.push(myVotes.third.id ? myVotes.third.id : '');
      }
      for (let i=0; i<nomsFinal.length; i++) {
        if (!myVotesIds.includes(nomsFinal[i].id)) {
          myNomsFinal.push(nomsFinal[i]);
        }
      }
      return myNomsFinal;
    },

    possible() {
      return this.nomsFinal.length;
    },

    pickYourChoice() {
      const myVotes = this.myVotes;
      // let choice = 'first';
      let choice = 'first';
      if (myVotes.first && myVotes.first.id && this.myNomsFinal.length > 1) {
          choice = 'second';
        if (myVotes.second && myVotes.second.id && this.myNomsFinal.length > 2) {
          choice = 'third';
        }
      }
      return choice;
    },

    voteButtonText() {
      return `select ${this.pickYourChoice} choice`;
    },

    canStillMakeChoice() {
      let canI = true;
      const votesFinished = this.movieNight.votesFinished;
      const myVotes = this.myVotes;
      // const possible = this.nomsFinal.length;

      if (votesFinished) {
        canI = false;
      }
      if (this.movieNight.friendsWhoFinishedVoting && this.movieNight.friendsWhoFinishedVoting.includes(this.voterId)) {
        canI = false;
      }
      if (this.possible >= 3 && myVotes.first && myVotes.first.id && myVotes.second && myVotes.second.id && myVotes.third && myVotes.third.id) {
        canI = false;
      }
      if (this.possible <= 2 && myVotes.first && myVotes.first.id) {
        canI = false;
      }
      return canI;
    },

    canSubmitMyVotes() {
      let canI = true;
      if (this.movieNight.votesFinished) {
        canI = false;
      }
      if (this.movieNight.friendsWhoFinishedVoting && this.movieNight.friendsWhoFinishedVoting.includes(this.voterId)) {
        canI = false;
      }
      return canI;
    },

    



  },



  methods: {

    shuffleArray(array) {
      let curId = array.length;
      // There remain elements to shuffle
      while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
      }
      return array;
    },


    updateMyVotesInDbaseAndStore(myVotes) {
      // update dbase
      const db = getDatabase();
      let updates = {};
      updates[`movieNights/${this.uIdAdmin}/${this.mnId}/votes/${this.voterId}`] = myVotes;
      update(ref(db), updates);

      // update store
      this.$store.dispatch('movieNights/updateMyVotes', { myVotes, voterId: this.voterId});
    },


    updateFriendsWhoFinishedVotingInDbaseAndStore(friendsIds) {
      const db = getDatabase();
      let updates = {};
      updates[`movieNights/${this.uIdAdmin}/${this.mnId}/friendsWhoFinishedVoting`] = friendsIds;
      update(ref(db), updates);

      this.$store.dispatch('movieNights/updateFriendsWhoFinishedVoting', {friendsWhoFinishedVoting: friendsIds});
    },


    updateVotesFinishedInDbaseAndStore() {
      const db = getDatabase();
      let updates = {};
      updates[`movieNights/${this.uIdAdmin}/${this.mnId}/votesFinished`] = true;
      update(ref(db), updates);

      this.$store.dispatch('movieNights/updateVotesFinished', {votesFinished: true});
    },



    // vote for a movie
    voteForMovie(movie) {
      console.log('*** voteForMovie(movie)', movie);

      let myVotes = this.myVotes;
      myVotes[this.pickYourChoice] = movie;
      console.log('myVotes', myVotes, this.pickYourChoice);

      this.updateMyVotesInDbaseAndStore(myVotes);

    },


    // remove a vote
    removeVote(choice) {
      console.log('*** removeVote(movie)', choice);

      let myVotes = this.myVotes;
      myVotes[choice] = {lorem: 'ipsum'};
      this.updateMyVotesInDbaseAndStore(myVotes);
    },


    


    // submitMyVotes
    submitMyVotes() {
      console.log('*** submitMyVotes', this.myVotes);
      const myVotes = this.myVotes;
      let showConfirmation = false;
      // if you can have up to 3
      if (this.possible >= 3 && ( !myVotes.first || !myVotes.first.id || !myVotes.second || !myVotes.second.id || !myVotes.third || !myVotes.third.id )) {
        showConfirmation = true;
      }
      // if you can have up 2 or 1 choices ()
      if (this.possible <= 2 && ( !myVotes.first || !myVotes.first.id )) {
        showConfirmation = true;
      }

      if (showConfirmation) {
        this.submitMyVotesDialog = true;
      } else {
        this.reallySubmitMyVotes();
      }
      
    },


    // REALLY submit my votes
    reallySubmitMyVotes() {
      console.log('*** reallySubmitMyVotes', this.myVotes)
      this.submitMyVotesDialog = false;

      // update dbase and store - myVotes
      let myFinalVotes = {};
      const myVotes = this.myVotes;
      if (myVotes.first && myVotes.first.id) {
        myFinalVotes['first'] = myVotes.first; 
      }
      if (myVotes.second && myVotes.second.id) {
        myFinalVotes['second'] = myVotes.second;
      }
      if (myVotes.third && myVotes.third.id) {
        myFinalVotes['third'] = myVotes.third;
      }
      this.updateMyVotesInDbaseAndStore(myFinalVotes);


      // add voterId to movieNight/friendsWhoFinishedVoting
      let friendsWhoFinishedVoting = this.movieNight.friendsWhoFinishedVoting ? this.movieNight.friendsWhoFinishedVoting : [];
      if (!friendsWhoFinishedVoting.includes(this.voterId)) {
        friendsWhoFinishedVoting.push(this.voterId);
      }
      
      // update dbase and store - friendsWhoFinishedVoting
      this.updateFriendsWhoFinishedVotingInDbaseAndStore(friendsWhoFinishedVoting);

      
      // check if everybody 
      if (friendsWhoFinishedVoting.length == this.movieNight.allowedFriends.length) {
        this.updateVotesFinishedInDbaseAndStore();
      }


      // trigger a new sms msg "voting is finished. check out the results."


    },




  },


  created() {
    // this.getNomsFinal();
    let nomsFinal = []; // i expect a list of movie objects
    // if nomsFinal already exists, then use that
    if (this.movieNight.nomsFinal && this.movieNight.allowedFriends) {
      nomsFinal = this.movieNight.nomsFinal; 
    } else { // if no nomsFinal, then create one
      // for each friend
      for (let i=0; i<this.movieNight.allowedFriends.length; i++) {
        // loop through that friend's noms
        const friendId = this.movieNight.allowedFriends[i];
        const noms = this.movieNight.nominations[friendId];
        for (let n=0; n<noms.length; n++) {
          // add to nomsFinal
          if(!nomsFinal.includes(noms[n])) {
            let nom = noms[n];
            nom.dialog = false;
            nomsFinal.push(nom);
          }
        }
      }
      nomsFinal = this.shuffleArray(nomsFinal);
      // update dbase
      const db = getDatabase();
      let updates = {};
      updates[`movieNights/${this.uIdAdmin}/${this.mnId}/nomsFinal`] = nomsFinal;
      update(ref(db), updates);
      // update store
    }
  },








};
</script>