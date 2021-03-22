<template>
  <div>
    <option-title :title="'Joueur ' + i + ' : ' + player.tag" />
    <color-picker-select
      :color-options="colors"
      label="Select Color..."
      input-id="color"
      v-model="selectedColorHex"
      :obj="player.bg"
    ></color-picker-select>

    <div v-if="!lockTag">
      <config-color
        :id="'j' + i"
        :title="'Tag'"
        :obj="player.myTag"
        :lockTag="lockTag"
      ></config-color>
    </div>
    <config-color
      :id="'j' + i"
      :title="'Fond'"
      :obj="player.bg"
      :lockTag="lockTag"
    ></config-color>
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
          name: "Joueur 1",
        },
        {
          hex: "#0049b9",
          hex2: "#0086ea",
          name: "Joueur 2",
        },
        {
          hex: "#e39802",
          hex2: "#ffc603",
          name: "Joueur 3",
        },
        {
          hex: "#038223",
          hex2: "#1cc13e",
          name: "Joueur 4",
        },
        {
          hex: "#a24a11",
          hex2: "#ff6e36",
          name: "Joueur 5",
        },
        {
          hex: "#0cb7b0",
          hex2: "#63c7e3",
          name: "Joueur 6",
        },
        {
          hex: "#df2c87",
          hex2: "#b17084",
          name: "Joueur 7",
        },
        {
          hex: "#552ead",
          hex2: "#726eba",
          name: "Joueur 8",
        },
      ],
    };
  },
  methods: {
  },
};
</script>

<style>
select option {
  /* background-image: linear-gradient(to right bottom, #d41619, #f66e25); */
  background: #f66e25;
}
</style>