import { get, getDatabase, ref, set } from "firebase/database";

export default {


  // create a new movieNight "event" -- called by /create > sendInvites()
  // create a new movieNight "event"
  // create a new movieNight "event"
  // create a new movieNight "event"
  async createEvent(context, data) {
    console.log('***** starting store/events/actions > createEvent() *****', context, data);
    const uIdAdmin = data.uIdAdmin;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    // console.log('data', data);
    const movieNight = {
      uIdAdmin,
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
    };

    console.log('*** about to create new movieNight in dbase ***', movieNight);
    const db = getDatabase();
    set(ref(db, `events/${uIdAdmin}/${date}`), movieNight);
  },



  // get the event object (movieNight) -- called from /votes > created()
  // get the event object (movieNight)
  // get the event object (movieNight)
  // get the event object (movieNight)
  async getEventObject(context, data) {
    const uIdAdmin = data.uIdAdmin;
    const dateAndTime = data.dateAndTime;
    const db = getDatabase();

    get(ref(db, `events/${uIdAdmin}/${dateAndTime}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // save the movieNight object to the store
          // create and save allowedFriends
          const movieNight = snapshot.val();
          let allowedFriends = [];
          for (let i=0; i < movieNight.friends.length; i++ ) {
            allowedFriends.push(movieNight.friends[i].id);
          }
          context.commit('allowedFriends', allowedFriends);
          context.commit('movieNight', movieNight);
        } else {
          console.log('no data available', uIdAdmin, dateAndTime);
          context.commit('allowedFriends', null);
          context.commit('movieNight', null);
        }
      })
      .catch((error) => {
        console.error(error);
      });



  },

};

