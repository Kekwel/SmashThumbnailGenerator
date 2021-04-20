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
          <button @click="changeDirection('topleft'); active = 'topleft';" class="button is-small" :class="{'is-primary': isActive('topleft')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.top.left"></svg-icon>
            </span>
          </button>
          <button @click="changeDirection('up'); active = 'up';" class="button is-small" :class="{'is-primary': isActive('up')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.up"></svg-icon>
            </span>
          </button>
          <button @click="changeDirection('topright'); active = 'topright';" class="button is-small" :class="{'is-primary': isActive('topright')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.top.right"></svg-icon>
            </span>
          </button>
          <br />
          <button @click="changeDirection('left'); active = 'left';" class="button is-small" :class="{'is-primary': isActive('left')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.left"></svg-icon>
            </span>
          </button>
          <button class="button is-small">
            <span class="icon is-small"> </span>
          </button>
          <button @click="changeDirection('right'); active = 'right';" class="button is-small" :class="{'is-primary': isActive('right')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.right"></svg-icon>
            </span>
          </button>
          <br />
          <button @click="changeDirection('bottomleft'); active = 'bottomleft';" class="button is-small" :class="{'is-primary': isActive('bottomleft')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.bottom.left"></svg-icon>
            </span>
          </button>
          <button @click="changeDirection('down'); active = 'down';" class="button is-small" :class="{'is-primary': isActive('down')}">
            <span class="icon is-small">
              <svg-icon type="mdi" :path="icon.down"></svg-icon>
            </span>
          </button>
          <button @click="changeDirection('bottomright'); active = 'bottomright';" class="button is-small" :class="{'is-primary': isActive('bottomright')}">
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
      active: '',
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
      if (this.lockTag && this.objs) {
        for (var tmp of this.objs) {
          tmp.colorDirection = dir;
        }
      } else {
        this.obj.colorDirection = dir;
      }
    },
    isActive(val) {
      return this.active === val;
    },
  },
};
</script>