<template>
  <div>
    <option-title :title="$t('title.player', { nb: i })" />
    <color-picker-select ref="bgpicker" :color-options="colors" :label="$t('label.color')" input-id="color" v-model="selectedColorHex" :obj="player.bg" />

    <config-color :ref="'color-bg-' + i" :id="'fondj' + i" :title="$t('title.fond')" :obj="player.bg" :lockTag="lockTag" />
    <div v-if="!lockTag">
      <config-color :ref="'color-tag-' + i" :id="'tagj' + i" :title="$t('title.tag')" :obj="player.myTag" :lockTag="lockTag" />
    </div>
  </div>
</template>

<script>
import ColorPickerSelect from "../ui/ColorPickerSelect.vue";
import OptionTitle from "../ui/OptionTitle.vue";
import ConfigColor from "./ConfigColor.vue";
export default {
  components: { ConfigColor, OptionTitle, ColorPickerSelect },
  props: {
    player: Object,
    i: Number,
    lockTag: Boolean,
  },
  data() {
    return {
      selectedColorHex: "",
      colors: [
        {
          hex: "#d41619",
          hex2: "#f66e25",
          name: `${this.$t('title.player', { nb: 1 })}`,
        },
        {
          hex: "#0049b9",
          hex2: "#0086ea",
          name: `${this.$t('title.player', { nb: 2 })}`,
        },
        {
          hex: "#e39802",
          hex2: "#ffc603",
          name: `${this.$t('title.player', { nb: 3 })}`,
        },
        {
          hex: "#038223",
          hex2: "#1cc13e",
          name: `${this.$t('title.player', { nb: 4 })}`,
        },
        {
          hex: "#a24a11",
          hex2: "#ff6e36",
          name: `${this.$t('title.player', { nb: 5 })}`,
        },
        {
          hex: "#0cb7b0",
          hex2: "#63c7e3",
          name: `${this.$t('title.player', { nb: 6 })}`,
        },
        {
          hex: "#df2c87",
          hex2: "#b17084",
          name: `${this.$t('title.player', { nb: 7 })}`,
        },
        {
          hex: "#552ead",
          hex2: "#726eba",
          name: `${this.$t('title.player', { nb: 8 })}`,
        },
      ],
    };
  },
  methods: {
    randomColor() {
      var rand = this.colors[Math.floor(Math.random() * 8)];
      this.selectedColorHex = rand;
      this.$refs.bgpicker.setColor(rand.hex, rand.hex2, rand.name);
    },
    setActiveDirectionTag(val, index) {
      if (!this.lockTag) {
        this.$refs['color-tag-' + this.i].resetActive('M');
        this.$refs['color-tag-' + this.i].setActive(val, index);
      }
    },
    setActiveDirectionBG(val, index) {
      this.$refs['color-bg-' + this.i].resetActive('B');
      this.$refs['color-bg-' + this.i].setActive(val, index);
    }
  },
};
</script>