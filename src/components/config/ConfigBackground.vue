<template>
  <div>
    <!-- use same color/gradient -->
    <!-- TODO explication -->
    <input
      type="checkbox"
      id="lockTag"
      v-model="isLockTag"
      @change="lockTag($event)"
    />
    <label for="lockTag"> Couleur bandeau lié (Tag, Phases)</label>
    <div v-if="isLockTag">
      <config-color :objs="[j1.myTag, j2.myTag, phase1, phase2]" :lockTag="isLockTag"></config-color>
    </div>
    <!-- TODO bg unique -->
    <config-background-player
      :i="1"
      :player="j1"
      :lockTag="isLockTag"
    ></config-background-player>
    <config-background-player
      :i="2"
      :player="j2"
      :lockTag="isLockTag"
    ></config-background-player>

    <div v-if="!isLockTag">
      <h3>Phase</h3>
      <div class="columns is-gapless">
        <div class="column">
          <config-color :obj="phase1" :lockTag="isLockTag"></config-color>
        </div>
        <div class="column">
          <config-color :obj="phase2" :lockTag="isLockTag"></config-color>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigBackgroundPlayer from "./ConfigBackgroundPlayer.vue";
import ConfigColor from "./ConfigColor.vue";
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
      isLockTag: true,
    };
  },
  methods: {
    lockTag() {
      console.log(".. lock tag ", this.isLockTag);
    },
  },
};
</script>