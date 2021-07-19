<template>
  <v-container class="pa-2" style="height: 100%;">
    <v-row no-gutters>
      <v-col>
        <v-file-input 
          id="imgUpload"
          @change="addImg"
          accept="image/png, image/jpeg, image/bmp" 
          :placeholder="$t('placeholder.image')" 
          prepend-icon="mdi-image-plus" 
          :label="$t('label.img.new')"></v-file-input>

          <div>
            <!-- <div v-for="(img, idx) in orderedImages" :key="idx"> -->
              <!-- TODO custom component pour watch IMG tranquil -->
              <v-card v-for="(img, idx) in orderedImages" :key="idx" class="mx-auto mb-2" max-width="344" elevation="2">
                <info-component :index="canvas.getObjects().indexOf(img)" :img="img" />
                <v-card-actions>
                  <v-btn @click="lowerImgToBottom(img)" dark x-small :disabled="crtIndex(img) === 0">
                    <v-icon dense>mdi-chevron-double-down</v-icon>
                  </v-btn>
                  <v-btn @click="lowerImg(img)" dark x-small :disabled="crtIndex(img) === 0" color="grey darken-1">
                    <v-icon dense>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-btn @click="upperImg(img)" dark x-small :disabled="crtIndex(img) === maxIndex() - 1" color="grey darken-1">
                    <v-icon dense>mdi-chevron-up</v-icon>
                  </v-btn>
                  <v-btn @click="upperImgToTop(img)" dark x-small :disabled="crtIndex(img) === maxIndex() - 1">
                    <v-icon dense>mdi-chevron-double-up</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="deleteImg(img)" dark small color="error" v-if="!img.customParent">
                    <v-icon dense>mdi-delete</v-icon>
                  </v-btn>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="img.customParent.reset()" dark small color="cyan" v-if="img.customParent" v-bind="attrs" v-on="on">
                        <v-icon dense>mdi-sync</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('tooltip.btn.reset') }}</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            <!-- </div> -->
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fabric } from "fabric";
import { orderBy } from 'lodash';
import InfoComponent from '../ui/InfoComponent.vue';
export default {
  components: { InfoComponent },
  data() {
    return {
      canvas: null,
      images: [],
      newImages: []
    }
  },
  computed: {
    orderedImages() {
      return this.canvas ? orderBy(this.canvas.getObjects(), this.crtIndex, 'desc') : [];
    }
  },
  methods: {
    updateCanvas(canvas) {
      this.canvas = canvas;
      this.images = canvas ? orderBy(canvas.getObjects(), this.crtIndex, 'desc') : [];
    },
    crtIndex(img) {
      return this.canvas.getObjects().indexOf(img);
    },
    maxIndex() {
      return this.canvas.getObjects().length;
    },
    addImg(file) {
      if (file) {
        var url = URL.createObjectURL(file);
        var self = this;
  
        fabric.Image.fromURL(url, function (oImg) {
          oImg.name = file.name;
          oImg.id = Date.now();
          self.images.push(oImg);
          self.newImages.push(oImg);
          
          //self._y = self.canvas.height - oImg.getScaledHeight();
          //oImg.set('top', self._y);
          //oImg.moveTo(self._index);
          self.canvas.add(oImg);
          self.canvas.requestRenderAll();
  
          document.getElementById('imgUpload').value = "";
        });
      }
    },
    putImage(img) {
      this.images.push(img);
      this.newImages.push(img);
    },
    deleteImg(img) {
      this.canvas.remove(img);

      var index = this.images.indexOf(img);
      var newIndex = this.newImages.indexOf(img);
      this.images.splice(index, 1);
      this.newImages.splice(newIndex, 1);
    },

    goToIndex(img, index) {
      img.moveTo(index);
    },
    lowerImg(img) {
      var index = this.crtIndex(img) - 1;
      img.moveTo(index--);
    },
    lowerImgToBottom(img) {
      this.goToIndex(img, 0);
    },
    upperImg(img) {
      var index = this.crtIndex(img) + 1;
      img.moveTo(index++);
    },
    upperImgToTop(img) {
      this.goToIndex(img, this.maxIndex());
    },
  },
};
</script>

<style scoped>
.list-enter, .list-leave-to {
  opacity: 0;
}
.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}
.list-move {
  transition: transform 0.5s ease-out;
}
</style>