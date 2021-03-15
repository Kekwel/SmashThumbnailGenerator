<template>
  <div>
    <h2>
      Joueur {{ i }} : <b>{{ player.tag }}</b>
    </h2>
      <div v-if="!lockTag">
        <config-color
          :title="'Tag'"
          :obj="player.myTag"
          :lockTag="lockTag"
        ></config-color>
      </div>
      <config-color
        :title="'Fond'"
        :obj="player.bg"
        :lockTag="lockTag"
      ></config-color>
  </div>
</template>

<script>
import ConfigColor from "./ConfigColor.vue";
export default {
  components: { ConfigColor },
  props: {
    player: Object,
    i: Number,
    lockTag: Boolean,
  },
};
</script>