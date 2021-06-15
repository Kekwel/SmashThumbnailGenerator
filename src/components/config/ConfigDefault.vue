<template>
  <v-container class="pa-2">
    <v-row no-gutters>
      <v-col>
        <!-- Export / Import -->
        <option-title :title="'Export/Import layout'"/>

        <v-btn dark color="primary" @click="$emit('export-json')">
          <v-icon dark left>mdi-download</v-icon>
          EXPORT
        </v-btn>
        <v-btn :loading="isSelecting" @click="onButtonClick">
          <v-icon dark left>mdi-upload</v-icon>
          IMPORT
        </v-btn>
        <input ref="uploader" class="d-none" type="file" accept="text/plain" @change="$emit('import-json', $event.target.files[0])">

        <v-select class="mt-4" :items="layouts" item-text="name" item-value="layout" label="Layouts" dense hide-details v-model="crtLayout" @change="updateLayout"></v-select>

        <!-- Grid -->
        <option-title class="mt-2" title="Grid"/>
        <v-switch class="mt-2" v-model="isDisplayGrid" label="Affichage Grid" @change="updateGrid" :loading="loadingGrid" />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import Layouts from "../../utils/layouts"
export default {
  components: { OptionTitle },
  props: {},
  data() {
    return {
      isSelecting: false,
      layouts: [],
      crtLayout: null,
      isDisplayGrid: false,
      loadingGrid: false
    };
  },
  created() {
    this.layouts = Layouts.LAYOUTS;
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click();
    },
    updateLayout() {
      this.$emit('import-infos', this.crtLayout);
    },
    updateGrid(val) {
      var self = this;
      // eslint-disable-next-line no-unused-vars
      let myPromise = new Promise(resolve => {
        console.log('yo', val);
        self.loadingGrid = true;
        setTimeout(() => {
          self.$emit('display-grid', val);
          console.log('coucou');
          self.loadingGrid = false
        }, 1000);
      });
    }
  }
};
</script>