<template>
  <div>
    <h3>Joueur {{ i }} : {{ player.tag }}</h3>
    <!-- <hr /> TODO HR -->
    Taille <input v-model="player.tagSize" /> <br />
    Couleur <input v-model="player.colorTag" /> <br />
    <input type="checkbox" :id="idBold" v-model="player.tagBold" />
    <label :for="idBold">Gras</label>
    <input type="checkbox" :id="idItalic" v-model="player.tagItalic" />
    <label :for="idItalic">Italique</label><br />

    Alignement <button @click="player.alignTag(null, 'top')">TOP</button
    ><button @click="player.alignTag(null, 'middle')">MIDDLE</button
    ><button @click="player.alignTag(null, 'bottom')">BOTTOM</button> <br />
    Alignement <button @click="player.alignTag('left')">LEFT</button
    ><button @click="player.alignTag('center')">CENTER</button
    ><button @click="player.alignTag('right')">RIGHT</button> <br />
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    i: Number,
  },
  data() {
      return {
          idBold: "italicPlayer" + this.i,
          idItalic: "boldPlayer" + this.i,
      }
  }
};
</script>