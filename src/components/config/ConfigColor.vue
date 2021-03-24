<template>
  <div>
    <div class="columns is-gapless">
      <div class="column">
        <h3>{{title}}</h3>
        <div class="colors" v-if="obj">
          <div v-for="color in obj.colors" :key="idColor + color.id">
            <input
              type="color"
              :id="idColor + color.id"
              name="head"
              v-model="color.hex"
              @input="changeColors()"
            />
            <label :for="idColor + color.id"> {{ color.hex }}</label>
          </div>
        </div>
        <div class="colors" v-if="objs && objs[0]">
          <div v-for="color in objs[0].colors" :key="idColor + color.id">
            <input
              type="color"
              :id="idColor + color.id"
              name="head"
              v-model="color.hex"
              @input="changeAllColors(color.id, color.hex)"
            />
            <label :for="idColor + color.id"> {{ color.hex }}</label>
          </div>
        </div>
      </div>
      <div class="column">
        <h3>Direction</h3>
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
          <button
            @click="changeDirection('bottomleft')"
            class="button is-small"
          >
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.bottom.left"></svg-icon>
            </span>
          </button>
          <button @click="changeDirection('down')" class="button is-small">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.down"></svg-icon>
            </span>
          </button>
          <button
            @click="changeDirection('bottomright')"
            class="button is-small"
          >
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.bottom.right"></svg-icon>
            </span>
          </button>
        </div>
      </div>
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
    objs: Array,
    lockTag: Boolean,
    title: String,
    id: String
  },
  data() {
    return {
      idColor: "idColor-" + this.id,
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
    changeAllColors(id, hex) {
      for (var tmp of this.objs) {
        this.colors = tmp.colors;
        this.colors[id].hex = hex;
        tmp.colors = this.colors;
      }
    },
    changeDirection(dir) {
      console.log('locktag', this.lockTag);
      if (this.lockTag && this.objs) {
        console.log(this.objs);
        for (var tmp of this.objs) {
          tmp.colorDirection = dir;
        }
      } else {
        this.obj.colorDirection = dir;
      }
    },
  },
};
</script>