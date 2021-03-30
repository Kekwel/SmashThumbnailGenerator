<template>
  <div>
    <div class="box">
      <option-title :title="'Match'" />
      Joueur 1 <input v-model="j1.tag" /> <br />
      VS <br />
      Joueur 2 <input v-model="j2.tag" /> <br />
      <!-- TODO Perso -->
      <!-- <v-select ref="mySelect" :options="characters" label="_name" v-model="j1.filename" :value="j1.filename"> -->
      <v-select ref="mySelect" :options="characters" label="_name" :reduce="charac => charac.getCharUrl()" @input="updateChar($event, j1)" >
        <template #selected-option="{ _name, _firstStockUrl }">
          <stock-icon :src="_firstStockUrl" /> {{ _name }}
        </template>
        <template #option="option">
          <div class="stock-icon">
            <stock-icon :src="option._firstStockUrl" />{{ option._name }}
          </div>
        </template>
      </v-select>
      <button @click="j1.flipChar()">FLIP</button>
    </div>
    <div id="info-phase" class="box">
      <option-title :title="'Phase'" />
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="phase1"
            value="Pools"
            v-model="phase1.txt"
            @change="focusPhase1()"
          />
          Pools
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase1"
            value="Winners"
            v-model="phase1.txt"
            @change="focusPhase1()"
            checked
          />
          Winners
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase1"
            value="Losers"
            v-model="phase1.txt"
            @change="focusPhase1()"
          />
          Losers
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase1"
            value="Grand"
            v-model="phase1.txt"
            @change="focusPhase1()"
          />
          Grand
        </label>
      </div>
      Custom 1 <input ref="phase1Input" v-model="phase1.txt" /><br />
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="phase2"
            value="Round "
            v-model="phase2.txt"
            @change="focusPhase2()"
            checked
          />
          Round
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase2"
            value="Quarters"
            v-model="phase2.txt"
            @change="focusPhase2()"
          />
          Quarters
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase2"
            value="Semis"
            v-model="phase2.txt"
            @change="focusPhase2()"
          />
          Semis
        </label>
        <label class="radio">
          <input
            type="radio"
            name="phase2"
            value="Finals"
            v-model="phase2.txt"
            @change="focusPhase2()"
          />
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
import vSelect from "vue-select";
import StockIcon from '../ui/StockIcon.vue';
export default {
  components: { OptionTitle, vSelect, StockIcon },
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
    return {
      isActive: true,
    };
  },
  methods: {
    focusPhase1() {
      this.$refs.phase1Input.focus();
    },
    focusPhase2() {
      this.$refs.phase2Input.focus();
    },
    updateChar(src, player) {
      console.log("update char for player ..");
      player.filename = src;
    }
  },
  mounted() {
    this.$refs.mySelect.open = true
  }
};
</script>

<style>
.v-select .vs__dropdown-menu {
	display: block;
}
.stock-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>