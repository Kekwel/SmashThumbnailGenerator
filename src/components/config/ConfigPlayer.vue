<template>
  <div>
    Joueur 1 <input v-model="j1.tag" /> <br />
    VS <br />
    Joueur 2 <input v-model="j2.tag" /> <br />
    <!-- TODO Perso -->
    Personnage <input v-model="j1.filename" /> <br />
    <button @click="j1.flipChar()">FLIP</button>
    <br />
    <div id="info-phase">
      <h3>Phase</h3>
      Custom 1 <input v-model="phase1.txt" /><br />
      <!-- TODO radio button Pools | Winners | Losers | Grand -->
      <!-- Taille 1<br /> -->
      Custom 2 <input v-model="phase2.txt" /><br />
      <!-- TODO radio button Round X | Quarters | Semis | Finals -->
      <!-- Taille 2<br /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {},
};
</script>