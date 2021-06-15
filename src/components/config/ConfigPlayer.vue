<template>
  <!-- Joueurs -->
  <v-container>
    <v-row no-gutters>
      <v-col>
        <option-title :title="'Match'" />
        <v-text-field v-model="j1.tag" color="red" background-color="red lighten-5" dense shaped filled hide-details onClick="this.select();" />
        <stock-icon-picker ref="charJ1" :characters="characters" :player="j1" />  

        <v-row no-gutters>
          <v-col cols="10">
            <div class="text-center versus ma-2">VS</div>
          </v-col>
          <v-col cols="2" align-self="center">
            <v-btn @click="reversePlayer();" color="primary" dark elevation="2" small>
              <v-icon dark>mdi-swap-vertical-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-text-field v-model="j2.tag" color="blue" background-color="blue lighten-5" dense shaped filled hide-details onClick="this.select();" />
        <stock-icon-picker ref="charJ2" :characters="characters" :player="j2" />

        <v-divider />

        <!-- Phase TODO component -->
        <option-title :title="'Phase'" />
        <v-radio-group v-model="phase1.txt" row @change="focusPhase1()" hide-details>
          <v-radio label="Pools" value="Pools" />
          <v-radio label="Winners" value="Winners" />
          <v-radio label="Losers" value="Losers" />
          <v-radio label="Grand" value="Grand" />
        </v-radio-group>
        <v-text-field ref="phase1Input" class="pa-0" label="" v-model="phase1.txt" single-line hide-details />
        
        <v-radio-group v-model="phase2.txt" row @change="focusPhase2()" hide-details>
          <v-radio label="Round" value="Round " />
          <v-radio label="Quarters" value="Quarters" />
          <v-radio label="Semis" value="Semis" />
          <v-radio label="Finals" value="Finals" />
        </v-radio-group>
        <v-text-field ref="phase2Input" class="pa-0" label="" v-model="phase2.txt" single-line hide-details/>

        <v-divider />

        <option-title title="Options" />

        <v-row no-gutters>
          <v-col>
            <v-checkbox v-model="j1.isTagClipPath" label="ClipPath J1" hide-details />
            <v-checkbox v-model="j2.isTagClipPath" label="ClipPath J2" hide-details />
          </v-col>
          <v-col>
            <v-checkbox v-model="phase1.isClipPath" label="ClipPath Phase 1" hide-details />
            <v-checkbox v-model="phase2.isClipPath" label="ClipPath Phase 2" hide-details />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from "../ui/OptionTitle.vue";
import "vue-select/dist/vue-select.css";
import StockIconPicker from "../ui/StockIconPicker.vue";
export default {
  components: { OptionTitle, StockIconPicker },
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
    characters: Array,
  },
  data() {
    return {};
  },
  methods: {
    focusPhase1() {
      this.$refs.phase1Input.focus();
    },
    focusPhase2() {
      this.$refs.phase2Input.focus();
    },
    selectChar(charJ1, charJ2){
      this.$refs.charJ1.selectChar(charJ1);
      this.$refs.charJ2.selectChar(charJ2);
    },
    reversePlayer() {
      // TAG
      let tagJ1 = this.j1.tag;
      let tagJ2 = this.j2.tag;
      this.j1.tag = tagJ2;
      this.j2.tag = tagJ1;

      // CHAR
      let charJ1 = this.j1.filename;
      let charJ2 = this.j2.filename;
      let char1 = this.$refs.charJ1.crtCharacter;
      let char2 = this.$refs.charJ2.crtCharacter;

      this.j1.filename = charJ2;
      this.j2.filename = charJ1;
      this.$refs.charJ1.selectChar(char2);
      this.$refs.charJ2.selectChar(char1);
      // TODO flip ?
    }
  },
  mounted() {
    // this.$refs.mySelect.open = true
  },
};
</script>

<style>
.v-select .vs__dropdown-menu {
  display: block;
}
.stock-icon-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-tag {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.versus {
  font-weight: bold;
  font-size: x-large;
}
</style>