<template>
  <v-container class="pa-2" style="height: 94vh;">
    <v-row no-gutters>
      <v-col>
        <!-- use same color/gradient -->
        <!-- TODO explication -->
        <v-checkbox v-model="isLockTag" @change="lockTag($event)" :label="$t('label.bindTag')" hide-details dense></v-checkbox>

        <v-row class="center" no-gutters v-if="isLockTag">
          <v-col>
            <option-title :title="$t('title.tagAndPhases')" />
            <config-color ref="allBandeau" :title="$t('title.fond')" :objs="[j1.myTag, j2.myTag, phase1, phase2]" :lockTag="isLockTag" />
          </v-col>
        </v-row>

        <v-divider class="my-2"/>

        <!-- TODO bg unique -->
        <v-row class="center" no-gutters>
          <v-col md="6" sm="12">
            <config-background-player ref="j1BG" :i="1" :player="j1" :lockTag="isLockTag" />
          </v-col>

          <v-col md="6" sm="12">
            <config-background-player ref="j2BG" :i="2" :player="j2" :lockTag="isLockTag" />
          </v-col>
        </v-row>

        <v-divider class="my-2"/>

        <v-row class="center" no-gutters v-if="!isLockTag">
          <v-col md="6" sm="12">
            <option-title :title="$t('title.phase', { nb: '1' })" />
            <config-color ref="p1BG" :id="'phase1'" :title="$t('title.fond')" :obj="phase1" :lockTag="isLockTag" />
          </v-col>

          <v-col md="6" sm="12">
            <option-title :title="$t('title.phase', { nb: '2' })" />
            <config-color ref="p2BG" :id="'phase2'" :title="$t('title.fond')" :obj="phase2" :lockTag="isLockTag" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
  mounted() {
    this.setActiveDirectionBG();
  },
  methods: {
    lockTag() {
      console.log(".. lock tag ", this.isLockTag);
      // TODO
    },
    randomColor() {
      this.$refs.j1BG.randomColor();
      this.$refs.j2BG.randomColor();
    },
    setActiveDirectionBG() {
      this.$refs.j1BG.setActiveDirectionBG('B', 2);
      this.$refs.j2BG.setActiveDirectionBG('B', 0);

      if (this.isLockTag) {
        this.$refs.allBandeau.resetActive('B');
        this.$refs.allBandeau.setActive('M', 2);
      } else {
        // TODO ?
      }
    }
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>