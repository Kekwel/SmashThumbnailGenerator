<template>
  <div>
    <h2>Joueur {{ i }} : <b>{{ player.tag }}</b></h2>
    <h3>Tag</h3>
    <config-color :obj="player.myTag"></config-color>
<!--     Couleur <input v-model="player.colorTagBg" /> <br />
    Couleur 2 <input v-model="player.color2TagBg" /> <br /> -->

    <h3>Fond</h3>
    <config-color :obj="player.bg"></config-color>

  </div>
</template>

<script>
import ConfigColor from './ConfigColor.vue';
export default {
  components: {ConfigColor},
  props: {
    player: Object,
    i: Number,
  }
};
</script>