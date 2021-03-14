<template>
  <div>
    <div class="colors">
      <div v-for="color in obj ? obj.colors : []" :key="color.id">
        <input
          type="color"
          id="head"
          name="head"
          v-model="color.hex"
          @input="changeColors()"
        />
        <label for="head"> {{ color.hex }}</label>
      </div>
    </div>
    <h2>Direction</h2>
    <div>
      <!-- TODO component button direction -->
      <button @click="changeDirection('topleft')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.top.left"></svg-icon>
        </span>
      </button>
      <button @click="changeDirection('up')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.up"></svg-icon>
        </span>
      </button>
      <button @click="changeDirection('topright')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.top.right"></svg-icon>
        </span>
      </button>
      <br />
      <button @click="changeDirection('left')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.left"></svg-icon>
        </span>
      </button>
      <button class="button is-small">
        <span class="icon is-small"> </span>
      </button>
      <button @click="changeDirection('right')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.right"></svg-icon>
        </span>
      </button>
      <br />
      <button @click="changeDirection('bottomleft')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.bottom.left"></svg-icon>
        </span>
      </button>
      <button @click="changeDirection('down')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.down"></svg-icon>
        </span>
      </button>
      <button @click="changeDirection('bottomright')" class="button is-small">
        <span class="icon is-small">
          <svg-icon type="mdi" :path="icon.bottom.right"></svg-icon>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiArrowBottomLeftThick,
  mdiArrowBottomRightThick,
  mdiArrowDownThick,
  mdiArrowLeftThick,
  mdiArrowRightThick,
  mdiArrowTopLeftThick,
  mdiArrowTopRightThick,
  mdiArrowUpThick,
} from "@mdi/js";
export default {
  components: { SvgIcon },
  props: {
    obj: Object,
  },
  data() {
    return {
      myColors: this.obj ? this.obj.colors : [],
      icon: {
        up: mdiArrowUpThick,
        down: mdiArrowDownThick,
        left: mdiArrowLeftThick,
        right: mdiArrowRightThick,
        top: {
          right: mdiArrowTopRightThick,
          left: mdiArrowTopLeftThick,
        },
        bottom: {
          right: mdiArrowBottomRightThick,
          left: mdiArrowBottomLeftThick,
        },
      },
    };
  },
  methods: {
    changeColors() {
      this.colors = this.obj.colors;
      this.obj.colors = this.colors;
    },
    changeDirection(dir) {
      this.obj.colorDirection = dir;
    },
  },
};
</script>