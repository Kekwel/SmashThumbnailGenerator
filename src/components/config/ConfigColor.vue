<template>
  <v-row no-gutters>
    <v-col>
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
    </v-col>

    <v-col>
      <h3>Direction</h3>
      <v-row class="center" no-gutters style="width: 80px; margin: auto;">
        <v-col>
          <!-- TODO component button direction -->
          <v-btn-toggle dense v-model="activeT" color="primary" @change="resetActive('T')">
            <v-btn @click="changeDirection('topleft');" small elevation="1" class="btn-min-width" >
              <v-icon small dense dark>mdi-arrow-top-left-thick</v-icon>
            </v-btn>
            <v-btn @click="changeDirection('up');" class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-arrow-up-thick</v-icon>
            </v-btn>
            <v-btn @click="changeDirection('topright');" class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-arrow-top-right-thick</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col>
          <v-btn-toggle dense v-model="activeM" color="primary" @change="resetActive('M')">
            <v-btn @click="changeDirection('left');" small elevation="1" class="btn-min-width" >
              <v-icon small dense dark>mdi-arrow-left-thick</v-icon>
            </v-btn>
            <v-btn class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-crop-square</v-icon>
            </v-btn>
            <v-btn @click="changeDirection('right');" class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-arrow-right-thick</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col>
          <v-btn-toggle dense v-model="activeB" color="primary" @change="resetActive('B')">
            <v-btn @click="changeDirection('bottomleft');" small elevation="1" class="btn-min-width" >
              <v-icon small dense dark>mdi-arrow-bottom-left-thick</v-icon>
            </v-btn>
            <v-btn @click="changeDirection('down');" class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-arrow-down-thick</v-icon>
            </v-btn>
            <v-btn @click="changeDirection('bottomright');" class="btn-min-width" small elevation="1">
              <v-icon small dense dark>mdi-arrow-bottom-right-thick</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    obj: Object,
    objs: Array,
    lockTag: Boolean,
    title: String,
    id: String
  },
  data() {
    return {
      activeT: 0,
      activeM: undefined,
      activeB: undefined,
      idColor: "idColor-" + this.id,
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
    resetActive(val) {
      if (val === 'T') {
        this.activeM = undefined;
        this.activeB = undefined;
      } else if (val === 'M') {
        this.activeT = undefined;
        this.activeB = undefined;
      } else if (val === 'B') {
        this.activeT = undefined;
        this.activeM = undefined;
      }
    },
    setActive(val, index) {
      if (val === 'T') {
        this.activeT = index;
      } else if (val === 'M') {
        this.activeM = index;
      } else if (val === 'B') {
        this.activeB = index;
      }
    }
  },
};
</script>