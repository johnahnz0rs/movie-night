import { getDatabase, ref, set } from "firebase/database";

export default {

  async createVotes(context, data) {
    console.log('****starting store/votes/actions createVotes()****', context, data);
    const uId = data.uId;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    let friendsIds = [uId];
    let votes = {};
    votes[uId] = {
      firstChoice: {},
      secondChoice: {},
    }
    for( let i = 0; i < data.friends.length; i++ ) {
      const id = data.friends[i].id;
      friendsIds.push(id);
      votes[id] = {
        firstChoice: {},
        secondChoice: {},
      };
    }
    const votesData = {
      admin: uId,
      friendsIds,
      nominations: [],
      votes,
      winner: {},
    };
    console.log('votesData:', votesData);
    const db = getDatabase();
    set(ref(db, `votes/${uId}/${date}`), votesData);
  },

  async sendAlerts(context, data) {
    console.log('**** starting store/votes/actions sendAlerts()****', context, data);
    const uId = data.uId;
    const eventName = data.eventName ? data.eventName : 'Move Night';
    const dateTime = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    const date = `${data.month} ${data.day}, ${data.year}`;
    const time = `${data.hour}:${data.minute} ${data.meridian}`;
    const location = data.location;
    const nomsPerFriend = data.nomsPerFriend;
    // let friendsNumbers = [];
    let newShortLinks = [];

    for( let i = 0; i < data.friends.length; i++ ) {
      // friendsNumbers.push(data.friends[i].id);
      const friendId = data.friends[i].id;
      // const dest = `http://localhost:8080/votes/${uId}/${dateTime}/${friendId}`;
      const dest = `https://nowthatscampin.com/votes/${uId}/${dateTime}/${friendId}`;
      // -H 'apikey: YOUR_API_KEY' \
      // -H 'Content-Type: application/json' \
      const newShortLinkResponse = await fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': '905d9976a1d24548ab0930f5f56bc93d',
        },
        body: {
          'destination': dest,
        }
      });

      if(!newShortLinkResponse.ok){
        const error = new Error(newShortLinkResponse.message || 'something went wrong with newShortLinkResponse');
        throw error;
      } else {
        console.log('all good', newShortLinkResponse.json());
      }
      // const endpoint = `https://api.rebrandly.com/v1/links/new?apikey=905d9976a1d24548ab0930f5f56bc93d&destination=http://localhost:8080/votes/${uId}/${dateTime}/${friendId}`
      // console.log('endpoint', endpoint);
      // let newShortLinksResponse = await fetch(`https://api.rebrandly.com/v1/links/new?apikey=905d9976a1d24548ab0930f5f56bc93d&destination=http://localhost:8080/votes/${uId}/${dateTime}/${friendId}`);
      // const responseData = await newShortLinksResponse.json();

      // if( !newShortLinksResponse.ok ) {
        // console.log()
      //   const error = new Error(newShortLinksResponse.message || 'something went wrong with newShortLinksResponse');
      //   throw error;
      // }

      // const responseData = await newShortLinksResponse.json();
      // console.log('responseData', responseData);

    }

    console.log(uId, eventName,dateTime, date, time, location, nomsPerFriend, newShortLinks);
    // const rebrandlyKey = '905d9976a1d24548ab0930f5f56bc93d';

    // http://localhost:8080/votes/EI6bcDolgrMcqCIz1iQWsEPrQ9z1/2022-Oct-9-2-07-AM/EI6bcDolgrMcqCIz1iQWsEPrQ9z1

  //   const response = await fetch(`https://stackin-vue-default-rtdb.firebaseio.com/reasons/${uId}.json?auth=${token}`);
  
  // // error handling
  // if(!response.ok) { 
  //   console.log(responseData);
  //   const error = new Error(response.message || 'Failed to add a win to today');
  //   throw error;
  // }

  // // manipulate & return data
  // const reasons = [];
  // const responseData = await response.json();
    // $ curl 'https://api.rebrandly.com/v1/links/new?apikey=YOUR_API_KEY&destination=https://www.youtube.com/watch?v=3VmtibKpmXI&slashtag=video&domain\[id\]=8f104cc5b6ee4a4ba7897b06ac2ddcfb'
    // slashtag and title are optional
  },


};
