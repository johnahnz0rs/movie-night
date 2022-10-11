import { getDatabase, ref, set } from "firebase/database";

export default {

  // create the /votes dbase object
  async createVotes(context, data) {
    console.log('****starting store/votes/actions createVotes()****', context, data);
    const uIdAdmin = data.uId;
    const admin = data.admin;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    const friends = data.friends;
    const votesData = {
      uIdAdmin,
      admin, 
      friends,
    };
    console.log('votesData:', votesData);
    const db = getDatabase();
    set(ref(db, `votes/${uIdAdmin}/${date}`), votesData);
  },


  // text all parties
  async sendAlerts(context, data) {
    console.log('**** starting store/votes/actions sendAlerts()****', context, data);
    const uId = data.uId;
    const eventName = data.eventName ? data.eventName : 'Move Night';
    const dateTime = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    const date = `${data.month} ${data.day}, ${data.year}`;
    const time = `${data.hour}:${data.minute} ${data.meridian}`;
    const location = data.location;
    const nomsPerFriend = data.nomsPerFriend;
    let newShortLinks = [];


    // send invites loop
    for( let i = 0; i < data.friends.length; i++ ) {

      // get 
      const friendId = data.friends[i].id;
      const dest = `https://nowthatscampin.com/votes/${uId}/${dateTime}/${friendId}`;
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

    console.log(uId, eventName,dateTime, date, time, location, nomsPerFriend, newShortLinks);
  },

};
