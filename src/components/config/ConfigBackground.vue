<template>
  <div style="margin: 1em auto;">
    <!-- use same color/gradient -->
    <!-- TODO explication -->
    <input type="checkbox" id="lockTag" v-model="isLockTag" @change="lockTag($event)" />
    <label for="lockTag"> Couleur bandeau lié (Tag, Phases)</label>
    <div class="box column center" v-if="isLockTag">
      <option-title :title="'Tag & Phases'" />
      <config-color :title="'Fond'" :objs="[j1.myTag, j2.myTag, phase1, phase2]" :lockTag="isLockTag" />
    </div>
    <!-- TODO bg unique -->
    <div class="box columns center">
      <config-background-player class="column" ref="j1BG" :i="1" :player="j1" :lockTag="isLockTag" />
      <config-background-player class="column" ref="j2BG" :i="2" :player="j2" :lockTag="isLockTag" />
    </div>
    <br />
    <div v-if="!isLockTag">
      <div class="box columns center">
        <div class="column">
          <option-title :title="'Phase 1'" />
          <config-color :id="'phase1'" :title="'Fond'" :obj="phase1" :lockTag="isLockTag" />
        </div>
        <div class="column">
          <option-title :title="'Phase 2'" />
          <config-color :id="'phase2'" :title="'Fond'" :obj="phase2" :lockTag="isLockTag" />
        </div>
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

<style scoped>
.center {
  text-align: center;
}
</style>