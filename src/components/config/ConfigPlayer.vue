<template>
  <div>
    <div class="box">
      <option-title :title="'Match'" />
      Joueur 1 <input v-model="j1.tag" /> <br />
      VS <br />
      Joueur 2 <input v-model="j2.tag" /> <br />
      <!-- TODO Perso -->
      Personnage <input v-model="j1.filename" /> <br />
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
  </div>
</template>

<script>
import OptionTitle from "../ui/OptionTitle.vue";
export default {
  components: { OptionTitle },
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
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
  },
};
</script>