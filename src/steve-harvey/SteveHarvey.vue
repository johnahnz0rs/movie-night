<template>
  <v-container>
    
    <v-row class="pb-5 mb-5">
      <v-col>
        <h1>required suits for men, according to steve harvey</h1>
        <ul class="ml-5">
          <li>get a black suit, a navy suit, a gray suit, brown suit, and a tan suit (jacket and pants)</li>
          <li>then get 2 each of white shirts, cream colored shirts, powder-blue shirts.</li>
          <li>you can mix and match any of the jackets to the pants to the shirts. to get 58 possible combinations, and they all work with each other.</li>
        </ul>
      </v-col>
    </v-row>
    

    <!-- <pre>{{combinations}}</pre> -->

    <v-row id="possible-combinations">
      <v-col v-for="(combo, i) in combinations" :key="i">
        <div class="d-flex justify-content-center">
          <img class="shirt" :class="combo.shirt" :src="'/steve-harvey/shirt2.png'">
          <img class="suit" :class="combo.suit" :src="'/steve-harvey/suit2.png'">
        </div>
        <img class="pants" :class="combo.pants" :src="'/steve-harvey/pants.png'">
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      suits: ['black', 'navy', 'gray', 'brown', 'tan'],
      pants: ['black', 'navy', 'gray', 'brown', 'tan'],
      shirts: ['white', 'cream', 'powder-blue'],
      combinations: [],
    };
  },
  created() {
    for (let i in this.suits) {
      const suitColor = this.suits[i];
      for (let j in this.shirts) {
        const shirtColor = this.shirts[j];
        for (let k in this.pants) {
          const pantsColor = this.pants[k];
          this.combinations.push({
            suit: suitColor,
            shirt: shirtColor,
            pants: pantsColor,
          });
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#possible-combinations .v-col { 
  border: 1px solid black;
}
img.pants  {
  width: 100%;
}
img {
  height: 100px;
}
.black {
  background-color: black;
}
.navy {
  background-color: #0B0B45;

}
.gray {
  background-color: #AFAFAF;
}
.brown {
  background-color: #5F331F;
}
.tan {
  background-color: #C2A78C;
}
.white {
  background-color: white;
}
.cream {
  background-color: #FFFDD0;
}
.powder-blue {
  background-color: #C3D8E4;
}
</style>