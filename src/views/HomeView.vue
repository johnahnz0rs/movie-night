<template>
  <div id="homepage">
    <v-container>


      <!-- hero -->
      <v-row id="hero-row">
        <v-col>            
            <h1 class="text-center">Movie Night</h1>

            <div id="hero-blurb" class="">
              <ul>
                <li>get together, watch a movie, easy peasy. right?</li>
                <li>WRONG. spend 40 minutes deciding, waste a bunch of time.</li>
                <li>cut the crap. let's put it to a vote.</li>
              </ul>
              <div class="w-100 text-center d-static mt-3">
                <v-btn @click="createNew" variant="outlined" color="white">Get Started</v-btn>
              </div>
            </div>

        </v-col>
      </v-row>



      <v-row id="more-info">
        <v-col>
          <!-- <div id="list"> -->
          <div class="d-flex justify-space-around my-5 py-5">
            <ol>
              <li>Plan a movie night</li>
              <li>Invite your friends</li>
              <li>Vote on what to watch</li>
              <li>Get the popcorn</li>
            </ol>
          </div>
          <div class="d-flex justify-space-around">
            <router-link to="/create" class="mb-5 pb-5 text-body-2">Plan your movie night now.</router-link>
          </div>
          <p class="mb-5 pb-5 text-caption">movieNight uses a form of <a href="https://time.com/5718941/ranked-choice-voting/#inline-ad-1" target="_blank">ranked choice voting</a> to cut the bs and get right to the movie</p>
        </v-col>
      </v-row>


    </v-container>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  methods: {
    createNew() {
      this.$router.push('/create');
    },
  },
};
</script>
<style lang="scss" scoped>
main #homepage .v-container {

  #hero-row {
    background-image: url('../assets/opt-vladimir-fedotov--w-V5GRG9-0-unsplash.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 82vh;
    margin: -16px;
    h1 { color: white; }
    .v-col {
      background-color: rgba(0,0,0,0.33);
      position: relative;
      #hero-blurb {
        position: absolute;
        bottom: 36px;
        ul {
          list-style: circle;
          padding-left: 24px;
          color: white;
          font-weight: bold;
          li {padding-bottom: 14px;}
        }
      }
    }
  }

  #more-info {
    p a {
      color: rgba(0,0,0,0.87);
    }
  }

}
</style>
