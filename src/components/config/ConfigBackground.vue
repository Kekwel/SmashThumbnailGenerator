<template>
  <div>
    <!-- TODO use same color/gradient -->
    <!-- TODO bg unique -->
    <config-background-player :i="1" :player="j1"></config-background-player>
    <config-background-player :i="2" :player="j2"></config-background-player>

    <h3>Phase</h3>
    <config-color :obj="phase1"></config-color>
    <config-color :obj="phase2"></config-color>
    <!-- 
    Couleur <input v-model="phase1.colorBg" /> <br />
    Couleur 2 <input v-model="phase1.color2Bg" /> <br />
    Couleur <input v-model="phase2.colorBg" /> <br />
    Couleur 2 <input v-model="phase2.color2Bg" /> <br /> -->
  </div>
</template>

<script>
import ConfigBackgroundPlayer from "./ConfigBackgroundPlayer.vue";
import ConfigColor from './ConfigColor.vue';
export default {
  components: { ConfigBackgroundPlayer, ConfigColor },
  props: {
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
};
</script>