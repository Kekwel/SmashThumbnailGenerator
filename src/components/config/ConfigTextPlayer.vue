<template>
  <div>
    <option-title class="pb-4" :title="title"/>
    <v-row no-gutters>
      <v-col cols="5">
        <v-text-field style="width: 3.5em;" v-model="player.size" :label="$t('label.size')" dense hide-details />
        <!-- <v-color-picker hide-canvas></v-color-picker> -->

        <input type="color" id="head" name="head" v-model="player.color" /> <br />
        <label for="head"> {{ player.color }}</label><br />
        <!-- <v-color-picker hide-canvas hide-sliders mode="hexa"></v-color-picker> -->
      </v-col>

      <v-col cols="7">
        <!-- TODO component CustomButton ? -->
        <v-btn-toggle dense mandatory v-model="activeV" color="primary">
          <!-- <v-btn @click="player.align(null, 'top'); activeV = 'top';" class="pa-1 no-min-width" :color="isActiveV('top') ? 'primary' : ''" :dark="isActiveV('top')" small> -->
          <v-btn @click="player.align(null, 'top');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-align-top</v-icon>
          </v-btn>
          <v-btn @click="player.align(null, 'middle');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-vertical-align-center</v-icon>
          </v-btn>
          <v-btn @click="player.align(null, 'bottom');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-align-bottom</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-divider class="my-2"/>
        
        <v-btn-toggle dense mandatory v-model="activeH" color="primary">
          <v-btn @click="player.align('left');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn @click="player.align('center');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn @click="player.align('right');" class="btn-min-width" small>
            <v-icon dense dark>mdi-format-align-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col>
        <v-checkbox v-model="player.bold" :label="$t('label.bold')" hide-details dense append-icon="mdi-format-bold"></v-checkbox>
        <v-checkbox v-model="player.italic" :label="$t('label.italic')" hide-details dense append-icon="mdi-format-italic"></v-checkbox>
        <v-slider v-model="player.angle" :label="$t('label.angle')" :thumb-size="24" thumb-label="always" min="0" max="360" step="5" dense hide-details></v-slider>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import OptionTitle from '../ui/OptionTitle.vue';
export default {
  components: { OptionTitle },
  props: {
    player: Object,
    title: String,
  },
  data() {
    return {
      activeV: 1,
      activeH: 1,
    };
  },
  methods: {}
};
</script>

<style>
.btn-min-width {
  min-width: 20px !important;
}
</style>