<template>
  <div>
    <div class="box">
      <config-text-player :i="1" :player="j1"></config-text-player>
    </div>
    <div class="box">
      <config-text-player :i="2" :player="j2"></config-text-player>
    </div>

    <div class="box">
      <config-text-phase :i="1" :phase="phase1"></config-text-phase>
      <config-text-phase :i="2" :phase="phase2"></config-text-phase>
    </div>
  </div>
</template>

<script>
import ConfigTextPlayer from "./ConfigTextPlayer.vue";
import ConfigTextPhase from "./ConfigTextPhase.vue";
export default {
  components: { ConfigTextPlayer, ConfigTextPhase },
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
  methods: {},
};
</script>