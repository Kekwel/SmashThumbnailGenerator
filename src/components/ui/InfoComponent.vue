<template>
  <v-container class="pa-2">
    <v-row no-gutters>
      <v-col>
        <div class="text-subtitle-2 mb-4">
            {{ index }} | {{ img.name }}
        </div>
        <v-row no-gutters>
          <v-col>
            <v-text-field style="width: 3.5em;" v-model="img.left" label="X" dense hide-details @change="updateX" />
          </v-col>
          <v-col>
            <v-text-field style="width: 3.5em;" v-model="img.top" label="Y" dense hide-details @change="updateY" />
          </v-col>
          <v-col>
            <v-text-field style="width: 3.5em;" v-model="img.angle" label="Rotation" dense hide-details @change="updateCanvas" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    index: Number,
    img: Object
  },
  methods: {
    updateX(x) {
      this.img.set('left', parseInt(x))
      this.updateCanvas();
    },
    updateY(y) {
      this.img.set('top', parseInt(y))
      this.updateCanvas();
    },
    updateCanvas() {
      this.img.setCoords();
      document.getElementById('can').fabric.renderAll();
    }
  }
}
</script>
