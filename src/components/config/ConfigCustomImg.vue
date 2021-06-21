<template>
  <v-container class="pa-2" style="height: 94vh;">
    <v-row no-gutters>
      <v-col>
        <v-file-input 
          id="imgUpload"
          @change="addImg"
          accept="image/png, image/jpeg, image/bmp" 
          :placeholder="$t('placeholder.image')" 
          prepend-icon="mdi-image-plus" 
          :label="$t('label.img.new')"></v-file-input>

        <div v-for="img in orderedImages" :key="img.id">
          <v-card class="mx-auto" max-width="344">
            {{ canvas.getObjects().indexOf(img) }} - {{ img.name }}
            <v-card-actions>
              <v-btn @click="lowerImgToBottom(img)" dark small :disabled="crtIndex(img) === 0">
                <v-icon dense>mdi-chevron-double-down</v-icon>
              </v-btn>
              <v-btn @click="lowerImg(img)" dark small :disabled="crtIndex(img) === 0">
                <v-icon dense>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="upperImg(img)" dark small :disabled="crtIndex(img) === maxIndex() - 1">
                <v-icon dense>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn @click="upperImgToTop(img)" dark small :disabled="crtIndex(img) === maxIndex() - 1">
                <v-icon dense>mdi-chevron-double-up</v-icon>
              </v-btn>
              <v-btn @click="deleteImg(img)" dark small color="error">
                <v-icon dense>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fabric } from "fabric";
import { orderBy } from 'lodash';
export default {
  props: {
    canvas: Object
  },
  data() {
    return {
      images: []
    }
  }, 
  computed: {
    orderedImages() {
      return orderBy(this.images, this.crtIndex, 'desc');
    }
  },
  methods: {
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
          
          //self._y = self.canvas.height - oImg.getScaledHeight();
          //oImg.set('top', self._y);
          //oImg.moveTo(self._index);
          self.canvas.add(oImg);
          self.canvas.requestRenderAll();
  
          document.getElementById('imgUpload').value = "";
        });
      }
    },
    deleteImg(img) {
      this.canvas.remove(img);

      var index = this.images.indexOf(img);
      this.images.splice(index, 1);
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
    putImage(img) {
      this.images.push(img);
    }
  },
};
</script>
