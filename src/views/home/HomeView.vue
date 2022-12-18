<template>
  <div id="homepage">
    <v-container fluid>


      <!-- hero -->
      <v-row id="hero-row" class="text-white">
        <v-col class="d-flex flex-column justify-space-between align-center">            
            <h1 class="text-h3">Movie Night</h1>
            <div id="hero-blurb" class="pb-5">
              <ul class="ml-5 font-weight-bold text-h6">
                <li>Come out to the couch, we'll watch a movie, have a few laughs.</li>
                <li>Right?? Wrong!! 40 minutes of analysis paralysis.</li>
                <li>Cut the bologna. Let's settle this right now, using democracy.</li>
              </ul>
              <div class="d-flex justify-center my-5">
                <v-btn @click="createNew" variant="outlined" color="white">Get Started</v-btn>
              </div>
            </div>
        </v-col>
      </v-row>



      <v-row id="more-info" >
        <v-col class="d-none d-sm-block">&nbsp;</v-col>

        <v-col :cols="moreInfoColSize" class="d-flex flex-column justify-space-around align-center">
          <div class="text-center">
            <p class="text-h3 font-weight-bold">movieNight uses a form of <a href="https://www.rcvresources.org/faq" target="_blank">ranked choice voting</a></p>
            <p class="text-h4 mt-3">so you can<br/><span class="font-italic">Keep It Simple, Señor</span></p>
          </div>
          
          <ol>
            <li>Plan a movie night</li>
            <li>Invite your friends</li>
            <li>Vote on what to watch</li>
            <li>Get the popcorn</li>
          </ol>
        
          
          <v-btn to="/create" color="blue">Plan your movie night now</v-btn>
        </v-col>

        <v-col class="d-none d-sm-block">&nbsp;</v-col>
      </v-row>


    </v-container>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  computed: {
    moreInfoColSize() {
      let cols = '12';
      if (this.$vuetify.display.smAndUp) {
        cols = '10';
      } else if (this.$vuetify.display.mdAndUp) {
        cols = '7';
      }
      return cols;
    },
    mdAndUp() {
      return this.$vuetify.display.mdAndUp;
    },
  },
  methods: {
    createNew() {
      this.$router.push('/create');
    },
  },
};
</script>
<style lang="scss" scoped>
main #homepage .v-container {

  padding-bottom: 69px;

  #hero-row {
    background-image: url('../../assets/opt-vladimir-fedotov--w-V5GRG9-0-unsplash.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 82vh;
    margin: -16px;
    .v-col {
      background-color: rgba(0,0,0,0.23);
      position: relative;

      #hero-blurb {
        ul li {
          padding-bottom: 14px;
          list-style: none;
          text-shadow: 2px 2px black;
        }
      }
    }
  }

  #more-info {
    min-height: 82vh;
    a {
      color: rgba(0,0,0,0.87);
    }
    ol li {
      padding-bottom: 14px;
    }

  }

}
</style>
