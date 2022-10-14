import { get, push, child, getDatabase, ref, set } from "firebase/database";

export default {

  async createMovieNight(context, data) {
    console.log('***** createMovieNight() *****', context, data);

    // vars
    const uIdAdmin = data.uIdAdmin;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    // console.log('data', data);
    let allowedFriends = [];
    let nominations = {};
    let votes = {};
    for (let i=0; i<data.friends.length; i++) {
      friendsId = data.friends[i].id
      allowedFriends.push(friendsId);
      nominations[friendsId] = { lorem: 'ipsum' };
      votes[friendsId] = { lorem: 'ipsum' };
    }
    
    const movieNight = {
      uIdAdmin,
      admin: data.admin,
      eventName: data.eventName,
      month: data.month,
      day: data.day,
      year: data.year,
      hour: data.hour,
      minute: data.minute,
      meridian: data.meridian,
      location: data.location,
      friends: data.friends,
      nomsPerFriend: data.nomsPerFriend,
      allowedFriends,
      nominations,
      votes,
      nomsFinished: false,
      votesFinished: false,

    };

    console.log('*** about to create new movieNight in dbase ***', movieNight);
    const db = getDatabase();
    // set(ref(db, `events/${uIdAdmin}/${date}`), movieNight);
    // set(ref(db, `movieNights/${uIdAdmin}/${date}`), movieNight);
    const movieNightKey = push(child(ref(db), `movieNights/${uIdAdmin}}`)).key;
    updates {
      
    }
  },




};