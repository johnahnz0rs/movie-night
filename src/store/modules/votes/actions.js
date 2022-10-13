import { get, getDatabase, ref, set } from "firebase/database";

export default {

  // const movieNight = { uIdAdmin, admin, eventName, month, day, year, hour, minute, meridian, location, friends, nomsPerFriend, };






  
  // create the /votes dbase object - from /create > sendInvites()
  // create the /votes dbase object
  // create the /votes dbase object
  // create the /votes dbase object
  async createVotes(context, data) {
    console.log('****starting store/votes/actions createVotes()****', context, data);
    const uIdAdmin = data.uIdAdmin;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    // const friends = data.friends;
    const votesData = {
      uIdAdmin,
      date,
      nomsFinished: false,
      votesFinished: false,
    };
    console.log('votesData:', votesData);
    const db = getDatabase();
    set(ref(db, `votes/${uIdAdmin}/${date}`), votesData);
  },









  // text all parties - from /create > sendInvites()
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









  // get my vote object - from /votes > created
  // get my vote object 
  // get my vote object 
  // get my vote object 
  async getVotesObject(context, data) {
    // console.log('*** starting getVotesObject() ***');
    const uIdAdmin = data.uIdAdmin;
    const dateAndTime = data.dateAndTime;
    const db = getDatabase();
    
    get(ref(db, `votes/${uIdAdmin}/${dateAndTime}`))
      .then((snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val();
        context.commit('votes', result);
        // console.log('committing votes', result);
      } else {
        console.log("No data available");
        context.comment('votes', null);
      }
      })
      .catch((error) => {
        console.error(error);
      });
  },




  




};
