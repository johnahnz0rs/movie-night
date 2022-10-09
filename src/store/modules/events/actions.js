import { getDatabase, ref, set } from "firebase/database";

export default {

  async createEvent(context, data) {
    console.log('*****starting store/events/actions createEvent()*****', context, data);
    const uId = data.uId;
    const date = `${data.year}-${data.month}-${data.day}-${data.hour}-${data.minute}-${data.meridian}`;
    console.log('movieNight', data);
    const db = getDatabase();
    set(ref(db, `events/${uId}/${date}`), data);
  },

};

