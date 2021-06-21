<template>
  <v-container class="pa-2">
    <v-row no-gutters>
        <option-title :title="$t('title.shadow.character')"/>
          <!-- <h4 class="subtitle is-4">Ombre Personnage</h4> -->
        <v-row no-gutters>
          <v-col>
            <shadow-setting :title="$t('title.player', {nb: 1})" :i="1" :obj="j1"/>
            <shadow-setting :title="$t('title.versus')" :i="7" :obj="versus"/>
          </v-col>
          <v-col>
            <shadow-setting :title="$t('title.player', {nb: 2})" :i="2" :obj="j2"/>
          </v-col>
        </v-row>
          <!-- <h4 class="subtitle is-4">Ombre Bandeau</h4> -->

        <option-title :title="$t('title.shadow.banner')"/>

        <v-row no-gutters>
          <v-col>
            <shadow-setting :title="$t('title.tagPlayer', {nb: 1})" :i="3" :obj="j1.myTag"/>
            <shadow-setting :title="$t('title.phase', {nb: 1})" :i="5" :obj="phase1"/>
          </v-col>
          <v-col>
            <shadow-setting :title="$t('title.tagPlayer', {nb: 2})" :i="4" :obj="j2.myTag"/>
            <shadow-setting :title="$t('title.phase', {nb: 2})" :i="6" :obj="phase2"/>
          </v-col>
        </v-row>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import ShadowSetting from '../ui/ShadowSetting.vue';
export default {
  components: { OptionTitle, ShadowSetting },
  props: {
    // TODO array object ?
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
    versus: Object
  },
  data() {
    return {};
  }
};
</script>