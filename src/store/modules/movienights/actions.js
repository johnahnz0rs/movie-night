// import { get, push, child, getDatabase, ref, set } from "firebase/database";
import { get, getDatabase, ref } from "firebase/database";

export default {



  // The candidate with the majority (more than 50%) of first-choice votes wins outright. If no candidate gets a majority of first-choice votes, then it triggers a new counting process. The candidate who did the worst is eliminated, and that candidate’s voters’ ballots are redistributed to their second-choice pick. In other words, if you ranked a losing candidate as your first choice, and the candidate is eliminated, then your vote still counts: it just moves to your second-choice candidate. That process continues until there is a candidate who has the majority of votes.


  
  // get the movieNight Object
  // get the movieNight Object
  // get the movieNight Object
  async getMovieNightObject(context, data) {
    const db = getDatabase();
    get(ref(db, `movieNights/${data.uIdAdmin}/${data.mnId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const movieNight = snapshot.val();
          context.commit('movieNight', movieNight);
          console.log('*** committing movieNight ***', movieNight);
        } else {
          console.log('*** getMovieNightObject() - no data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },










  // text all parties
  // text all parties
  // text all parties
  async sendAlerts(context, data) {

    // shortlink vars
    const uIdAdmin = data.uIdAdmin;
    const dateTime = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    const friends = data.friends;
    const friendsIds = [];

    // sms msg vars
    const adminName = data.admin.name;
    const eventName = data.eventName;
    const date = `${data.month} ${data.day}, ${data.year}`;
    const time = `${data.hour}:${data.minute} ${data.meridian}`;
    const location = data.location;

    // dev
    console.log('*** votes/actions/sendAlerts ***', context, data); 
    
    // create sms msg
    console.log('create sms msg', adminName, eventName, date, time, location);
    // create list of shortlinks
    console.log('get list of shortlinks', uIdAdmin, dateTime, friendsIds);
    // prep & send sms via twilio


    // OLD ===============
    // send invites
    for( let i = 0; i < friends.length; i++ ) {

      // get 
      const friendId = friends[i].id;
      const dest = `https://nowthatscampin.com/votes/${uIdAdmin}/${dateTime}/${friendId}`;
      const requestBody = JSON.stringify({ destination: dest });
      const newShortLinkResponse = await fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': '905d9976a1d24548ab0930f5f56bc93d',
        },
        body: requestBody
      });

      if(!newShortLinkResponse.ok){
        const error = new Error(newShortLinkResponse.message || 'something went wrong with newShortLinkResponse');
        throw error;
      } else {
        console.log('got a new shortlink', await newShortLinkResponse.json());
      }
    }

  },



  // update myNoms
  async updateMyNoms(context, data) {
    let movieNight = context.getters['movieNight'];
    movieNight.nominations[data.voterId] = data.noms;
    context.commit('movieNight', movieNight);
  },



  // update friendsWhoFinishedNominating
  async updateFriendsWhoFinishedNominating(context, data) {
    let movieNight = context.getters['movieNight'];
    movieNight.friendsWhoFinishedNominating = data.friendsWhoFinishedNominating;
    context.commit('movieNight', movieNight);
  },



  // update nomsFinished
  async updateNomsFinished(context, data) {
    let movieNight = context.getters['movieNight'];
    movieNight.nomsFinished = data.nomsFinished;
    context.commit('movieNight', movieNight);
  },





};