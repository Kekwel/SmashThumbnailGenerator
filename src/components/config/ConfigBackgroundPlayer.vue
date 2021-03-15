<template>
  <div>
    <h2>
      Joueur {{ i }} : <b>{{ player.tag }}</b>
    </h2>
    <div class="columns is-gapless">
      <div class="column" v-if="!lockTag">
        <h3>Tag</h3>
        <config-color :obj="player.myTag" :lockTag="lockTag"></config-color>
        <!--     Couleur <input v-model="player.colorTagBg" /> <br />
    Couleur 2 <input v-model="player.color2TagBg" /> <br /> -->
      </div>
      <div class="column">
        <h3>Fond</h3>
        <config-color :obj="player.bg" :lockTag="lockTag"></config-color>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigColor from "./ConfigColor.vue";
export default {
  components: { ConfigColor },
  props: {
    player: Object,
    i: Number,
    lockTag: Boolean
  },
};
</script>