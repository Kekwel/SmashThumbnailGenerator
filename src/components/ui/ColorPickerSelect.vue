<template>
  <div>
    <div class="wrapper-dropdown" style="width: 100%">
      <span @click="toggleDropdown()" v-html="selector"></span>
      <ul class="dropdown" v-show="active">
        <li v-if="emptyOption" @click="setColor()">
          <span class="noColor" v-if="!emptyOption"></span>
          {{ emptyOption === "true" ? "" : emptyOption }}
        </li>
        <li
          v-for="color in colors"
          :key="color.name"
          @click="setColor(color.hex, color.hex2, color.name)"
        >
          <span :style="{ background: color.hex }"></span> {{ color.name }}
        </li>
      </ul>
      <input
        type="hidden"
        :name="inputId"
        :id="inputId"
        v-model="selectedColor"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["color-options", "label", "empty-option", "input-id", "obj"],
  //must use kebab-case in html, camel case in JS};,
  data() {
    return {
      active: false,
      selectedColor: "",
      selectedColorName: "",
      colors: this.colorOptions,
      noSelection: true,
    };
  },
  computed: {
    selector: function () {
      if (!this.selectedColor && !this.emptyOption) {
        return this.label;
      } else if (!this.selectedColor && this.emptyOption) {
        if (this.emptyOption === "true") {
          return this.label;
        } else if (this.emptyOption !== "true" && this.noSelection === false) {
          return '<span class="noColor"></span> ' + this.emptyOption;
        } else {
          return this.label;
        }
      } else {
        return (
          '<span style="background: ' +
          this.selectedColor +
          '"></span> ' +
          this.selectedColorName
        );
      }
    },
  },
  methods: {
    setColor(color, color2, colorName) {
      this.selectedColor = color;
      this.selectedColorName = colorName;
      this.active = false;
      this.noSelection = false;
      this.$emit("input", this.selectedColor);
      this.updateColors(color, color2);
    },
    toggleDropdown() {
      this.active = !this.active;
    },
    updateColors(color, color2) {
      var _color1 = {id: 0, hex: color};
      var _color2 = {id: 1, hex: color2};
      this.tmp = [_color1, _color2];
      this.obj.colors = this.tmp;
    }
  },
};
</script>

<style scoped>
.wrapper-dropdown .dropdown {
  display: block;
}

.wrapper-dropdown {
  position: relative;
  width: 200px;
  background: #fff;
  color: #2e2e2e;
  outline: none;
  cursor: pointer;
}
.wrapper-dropdown > span {
  width: 100%;
  display: block;
  border: 1px solid #ababab;
  padding: 5px;
}
.wrapper-dropdown > span > span {
  padding: 0 12px;
  margin-right: 5px;
}
.wrapper-dropdown > span > span.noColor {
  background: #ccc;
  position: relative;
}
.wrapper-dropdown > span > span.noColor:after {
  content: "";
  background: red;
  -webkit-transform: rotate(-32deg);
  transform: rotate(-32deg);
  display: inline-block;
  width: 28px;
  height: 2px;
  position: absolute;
  bottom: 7px;
  left: -2px;
}
.wrapper-dropdown > span:after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: 16px;
  top: calc(50% + 4px);
  margin-top: -6px;
  border-width: 6px 6px 0 6px;
  border-style: solid;
  border-color: #2e2e2e transparent;
}

.wrapper-dropdown .dropdown {
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  font-weight: normal;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  border: 1px solid #ababab;
  border-top: 0;
}

.wrapper-dropdown .dropdown li {
  display: block;
  text-decoration: none;
  color: #2e2e2e;
  padding: 5px;
  cursor: pointer;
  min-height: 28px;
}

.wrapper-dropdown .dropdown li > span {
  padding: 0 12px;
  margin-right: 5px;
}
.wrapper-dropdown .dropdown li > span.noColor {
  background: #ccc;
  position: relative;
}
.wrapper-dropdown .dropdown li > span.noColor:after {
  content: "";
  background: red;
  -webkit-transform: rotate(-32deg);
  transform: rotate(-32deg);
  display: inline-block;
  width: 28px;
  height: 2px;
  position: absolute;
  bottom: 7px;
  left: -2px;
}

.wrapper-dropdown .dropdown li:hover {
  background: #eee;
  cursor: pointer;
}
</style>