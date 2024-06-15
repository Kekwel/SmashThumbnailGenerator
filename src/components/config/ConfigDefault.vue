<template>
  <v-container class="pa-2">
    <v-row no-gutters>
      <v-col>
        <!-- Startgg API key -->
        <option-title title="Start.gg"/>
        <v-row no-gutters>
          <v-col cols="11">
            <v-text-field dense hide-details v-model="apikey" :placeholder="$t('title.apiKey')"/>
          </v-col>

          <!-- how 2 generate api key https://developer.start.gg/docs/authentication/ -->
          <v-col cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon href="https://developer.start.gg/docs/authentication/" target="_blank" v-bind="attrs" v-on="on">
                  <v-icon color="warning">mdi-help-box</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('tooltip.menu.apikey') }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-checkbox :label="$t('label.startgg.remember')" hide-details dense v-model="rememberApikey"></v-checkbox>

        <!-- TODO Challonge ? -->
        <v-divider class="mt-4"/>
        <!-- Export / Import -->
        <option-title :title="$t('title.export')"/>

        <v-btn dark color="primary" @click="$emit('export-json')">
          <v-icon dark left>mdi-download</v-icon>
          {{ $t('button.export') }}
        </v-btn>
        <v-btn :loading="isSelecting" @click="onButtonClick">
          <v-icon dark left>mdi-upload</v-icon>
          {{ $t('button.import') }}
        </v-btn>
        <input ref="uploader" class="d-none" type="file" accept="text/plain" @change="$emit('import-json', $event.target.files[0])">

        <v-select class="mt-4" :items="layouts" item-text="name" item-value="layout" :label="$t('label.layouts')" dense hide-details v-model="crtLayout" @change="updateLayout"></v-select>

        <v-divider class="mt-4"/>

        <!-- Grid -->
<!--        <option-title class="mt-2" :title="$t('title.grid')"/>-->
<!--        <v-switch class="mt-2" v-model="isDisplayGrid" :label="$t('label.grid')" @change="updateGrid" :loading="loadingGrid" />-->
<!--        -->
<!--        <v-divider class="mt-4"/>-->
        <option-title class="mt-2" :title="$t('title.timestamp')"/>
        <v-switch class="mt-2" v-model="isDisplayTS" :label="$t('label.timestamp')" @change="updateTimestamp" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
import Layouts from "../../utils/layouts"
import { CustomText } from "../js/CustomText";
import Vue from "vue";
export default {
  components: { OptionTitle },
  props: {
    canvas: Object
  },
  data() {
    return {
      isSelecting: false,
      layouts: [],
      crtLayout: null,
      isDisplayGrid: false,
      loadingGrid: false,
      isDisplayTS: false,
      rectTS: null,
      apikey: '',
      rememberApikey: ""
    };
  },
  created() {
    this.layouts = Layouts.LAYOUTS;
    
    var tagOptions = { tag: "42:00", x: 935, y: 560, size: 120, color: "#ffffff" };
    var bgTagOptions = { width: 335, height: 150, x: 935, y: 560, colors: [ { id: 0, hex: "#000000" }, { id: 1, hex: "#000000" } ]};
    this.rectTS = new CustomText(this.canvas, tagOptions, bgTagOptions);
    this.rectTS.bgTag.rect.set('opacity', 0.75);
    this.rectTS.bgTag.rect.set('rx', 10);
    this.rectTS.bgTag.rect.set('ry', 10);
    this.rectTS.group.set('lockMovementX', true);
    this.rectTS.group.set('lockMovementY', true);
    this.rectTS.group.set('lockScalingX', true);
    this.rectTS.group.set('lockScalingY', true);
    this.rectTS.group.set('lockRotation', true);

    if (localStorage.apikey) {
      this.apikey = localStorage.apikey;
    }
    if (localStorage.rememberApikey) {
      this.rememberApikey = localStorage.rememberApikey;
    }
    if (localStorage.fetchStreamed) {
      console.log('allo ? ? ', this.fetchStreamed, localStorage.fetchStreamed)
      this.fetchStreamed = localStorage.fetchStreamed;
    }
  },
  watch: {
    apikey(newApikey) {
      if (localStorage.rememberApikey) {
        // si remember
        Vue.prototype.$apikey = '';
        localStorage.apikey = newApikey;
      } else {
        // si pas remember
        Vue.prototype.$apikey = newApikey
        localStorage.apikey = '';
      }
    },
    rememberApikey(newRememberApikey) {
      localStorage.rememberApikey = newRememberApikey ? "yes" : "";

      if (newRememberApikey) {
        // si remember
        Vue.prototype.$apikey = '';
        localStorage.apikey = this.apikey;
      } else {
        // si pas remember
        Vue.prototype.$apikey = this.apikey;
        localStorage.apikey = '';
      }
    },
    fetchStreamed(newFetchStreamed) {
      console.log('bah ? ', newFetchStreamed)
      localStorage.fetchStreamed = newFetchStreamed;
    }
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
        self.loadingGrid = true;
        setTimeout(() => {
          self.$emit('display-grid', val);
          self.loadingGrid = false
        }, 1000);
      });
    },
    updateTimestamp(val) {
      if (val) {
        this.canvas.add(this.rectTS.group);
      } else {
        this.canvas.remove(this.rectTS.group);
      }
    }
  }
};
</script>