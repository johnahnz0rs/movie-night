// import { get, push, child, getDatabase, ref, set } from "firebase/database";
import { get, getDatabase, ref } from "firebase/database";

export default {



  // The candidate with the majority (more than 50%) of first-choice votes wins outright. If no candidate gets a majority of first-choice votes, then it triggers a new counting process. The candidate who did the worst is eliminated, and that candidate’s voters’ ballots are redistributed to their second-choice pick. In other words, if you ranked a losing candidate as your first choice, and the candidate is eliminated, then your vote still counts: it just moves to your second-choice candidate. That process continues until there is a candidate who has the majority of votes.

  
  async getMovieNightObject(context, data) {
    const db = getDatabase();
    get(ref(db, `movieNights/${data.mn}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const movieNight = snapshot.val();
          context.commit('movieNight', movieNight);
          console.log('*** movieNight ***', movieNight);
        } else {
          console.log('*** getEventObject() - no data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

};