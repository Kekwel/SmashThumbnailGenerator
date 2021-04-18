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
    <div class="box" v-if="isLockTag">
      <option-title :title="'Tag & Phases'" />
      <config-color
        :title="'Fond'"
        :objs="[j1.myTag, j2.myTag, phase1, phase2]"
        :lockTag="isLockTag"
      ></config-color>
    </div>
    <!-- TODO bg unique -->
    <config-background-player
      ref="j1BG"
      class="box"
      :i="1"
      :player="j1"
      :lockTag="isLockTag"
    ></config-background-player>
    <config-background-player
      ref="j2BG"
      class="box"
      :i="2"
      :player="j2"
      :lockTag="isLockTag"
    ></config-background-player>

    <div v-if="!isLockTag">
      <div class="box">
        <option-title :title="'Phase 1'" />
        <config-color
          :id="'phase1'"
          :title="'Fond'"
          :obj="phase1"
          :lockTag="isLockTag"
        ></config-color>
        <option-title :title="'Phase 2'" />
        <config-color
          :id="'phase2'"
          :title="'Fond'"
          :obj="phase2"
          :lockTag="isLockTag"
        ></config-color>
      </div>
    </div>
  </div>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import ConfigBackgroundPlayer from "./ConfigBackgroundPlayer.vue";
import ConfigColor from "./ConfigColor.vue";
export default {
  components: { ConfigBackgroundPlayer, ConfigColor, OptionTitle },
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
    randomColor() {
      this.$refs.j1BG.randomColor();
      this.$refs.j2BG.randomColor();
    }
  },
};
</script>