<template>
  <div class="" style="margin: 1em auto;">
    <div class="columns box">
        <config-text-player class="column" :i="1" :player="j1" />
        <config-text-player class="column" :i="2" :player="j2" />
    </div>
    <br />
    <div class="columns box">
      <config-text-phase class="column" :title="'Phase 1'" :phase="phase1" />
      <config-text-phase class="column" :title="'Phase 2'" :phase="phase2" />
    </div>
    <div class="box">
      <config-text-phase :title="'Versus'" :phase="versus" />
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
    versus: Object,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {},
};
</script>