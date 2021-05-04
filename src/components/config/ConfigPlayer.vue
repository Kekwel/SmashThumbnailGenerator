<template>
  <div style="margin: 1em auto;">
    <!-- Joueurs -->
    <div class="box" style="width: 28em">
      <option-title :title="'Match'" />
      <div>
        <div class="columns is-centered">
          <div class="column input-tag">
            <input class="input is-danger" style="" v-model="j1.tag" onClick="this.select();" />
            <stock-icon-picker ref="charJ1" :characters="characters" :player="j1" />  
            <span class="versus">VS</span>
            <input class="input is-link" style="text-align: end;"  v-model="j2.tag" onClick="this.select();" />
            <stock-icon-picker ref="charJ2" :characters="characters" :player="j2" />
          </div>
        </div>
        <!-- TODO Colonne pour aligner + facilement le VS ? -->
        <!-- <div class="input-tag">
          Joueur 1 : <input class="input is-danger" style="width: 15em;" v-model="j1.tag" /> <br />
          <stock-icon-picker ref="charJ1" :characters="characters" :player="j1" />
        </div>
        <span class="input-tag versus">VS</span> <br />
        <div class="input-tag">
          Joueur 2 : <input class="input is-link" style="width: 15em;"  v-model="j2.tag" /> <br />
        </div> -->
      </div>
      <!-- J1 -->
      <!-- J2 -->
      <!-- <stock-icon-picker ref="charJ2" :characters="characters" :player="j2" /> -->
    </div>

    <!-- Phase TODO component -->
    <div id="info-phase" class="box">
      <option-title :title="'Phase'" />
      <div class="control">
        <label class="radio">
          <input type="radio" name="phase1" value="Pools" v-model="phase1.txt" @change="focusPhase1()" />
          Pools
        </label>
        <label class="radio">
          <input type="radio" name="phase1" value="Winners" v-model="phase1.txt" @change="focusPhase1()" checked />
          Winners
        </label>
        <label class="radio">
          <input type="radio" name="phase1" value="Losers" v-model="phase1.txt" @change="focusPhase1()" />
          Losers
        </label>
        <label class="radio">
          <input type="radio" name="phase1" value="Grand" v-model="phase1.txt" @change="focusPhase1()" />
          Grand
        </label>
      </div>
      Custom 1 <input ref="phase1Input" v-model="phase1.txt" /><br />
      <div class="control">
        <label class="radio">
          <input type="radio" name="phase2" value="Round " v-model="phase2.txt" @change="focusPhase2()" checked />
          Round
        </label>
        <label class="radio">
          <input type="radio" name="phase2" value="Quarters" v-model="phase2.txt" @change="focusPhase2()" />
          Quarters
        </label>
        <label class="radio">
          <input type="radio" name="phase2" value="Semis" v-model="phase2.txt" @change="focusPhase2()" />
          Semis
        </label>
        <label class="radio">
          <input type="radio" name="phase2" value="Finals" v-model="phase2.txt" @change="focusPhase2()" />
          Finals
        </label>
      </div>
      Custom 2 <input ref="phase2Input" v-model="phase2.txt" /><br />
    </div>
    <div class="box">
      <option-title :title="'Options'" />
      <input type="checkbox" id="clipPathJ1" v-model="j1.isTagClipPath" />
      <label for="clipPathJ1"> ClipPath J1 </label>
      <input type="checkbox" id="clipPathJ2" v-model="j2.isTagClipPath" />
      <label for="clipPathJ2"> ClipPath J2 </label><br />
      <input type="checkbox" id="clipPathPhase1" v-model="phase1.isClipPath" />
      <label for="clipPathPhase1"> ClipPath Phase 1 </label>
      <input type="checkbox" id="clipPathPhase2" v-model="phase2.isClipPath" />
      <label for="clipPathPhase2"> ClipPath Phase 2 </label>
    </div>
  </div>
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
/* .input-tag {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
} */
.input-tag {
  display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.versus {
  font-weight: bold;
  font-size: larger;
}
</style>