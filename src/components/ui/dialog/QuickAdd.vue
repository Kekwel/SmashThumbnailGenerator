<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card>
      <v-card-title class="headline">Ajout rapide</v-card-title>
      <v-divider class="ma-2"></v-divider>

      <v-card-text class="pa-1">
        <v-container>
          <v-row no-gutters>
            <v-col cols="3" class="mr-2">
              <!-- J1 TAG -->
              <v-text-field ref="quick-tag-j1" :rules="[() => !!newInfo.p1.tag || '']"
                :label="$t('title.player', {nb: '1'})" v-model="newInfo.p1.tag" 
                color="red" background-color="red lighten-5" dense outlined filled hide-details required onClick="this.select();" @keyup.enter="addInfo" />
            </v-col>
            <v-col cols="1" class="mr-2">
              <!-- J1 CHAR -->
              <v-select ref="quick-char-j1" :clearable=false selectOnTab class="player1 quick" :options="crtCharacters" label="name" v-model="newInfo.p1.characters">
                <template #selected-option="{ firstStockUrl }">
                  <div class="stock-icon-selected">
                    <stock-icon :width="28" :src="firstStockUrl" />
                  </div>
                </template>
                <template #option="option">
                  <div class="stock-icon-selected">
                    <stock-icon :width="28" :src="option.firstStockUrl" />
                  </div>
                </template>
              </v-select>
            </v-col>

            <div class="text-button" style="align-self: center;">VS</div>
            
            <v-col cols="3" class="mx-2">
              <!-- J2 TAG -->
              <v-text-field ref="quick-tag-j2" :rules="[() => !!newInfo.p2.tag || '']"
                :label="$t('title.player', {nb: '2'})" v-model="newInfo.p2.tag" 
                color="blue" background-color="blue lighten-5" dense outlined filled hide-details required onClick="this.select();" @keyup.enter="addInfo" />
            </v-col>
            <v-col cols="1" class="mr-2">
              <!-- J2 CHAR -->
              <v-select ref="quick-char-j2" :clearable=false selectOnTab class="player2 quick" :options="crtCharacters" label="name" v-model="newInfo.p2.characters">
                <template #selected-option="{ firstStockUrl }">
                  <stock-icon :width="28" :src="firstStockUrl" />
                </template>
                <template #option="option">
                  <stock-icon :width="28" :src="option.firstStockUrl" />
                </template>
              </v-select>
            </v-col>

            <div class="text-button" style="align-self: center;">|</div>

            <v-col cols="2" class="ml-2">
              <!-- Phase TODO select ? -->
              <v-text-field v-model="newInfo.phase" dense shaped filled hide-details onClick="this.select();" @keyup.enter="addInfo" />
            </v-col>

            <v-btn class="ml-2" dark x-small fab color="success" style="align-self: center;" @click="addInfo">
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>

          </v-row>
        </v-container>
        <br/>
        
        <div v-for="info in infos" :key="info.id">
          {{ info.id }} | {{ info.j1.tag }} ({{ info.j1.characters.name }}) VS {{ info.j2.tag }} ({{ info.j2.characters.name }}) - {{ info.phase }}
        </div>

        <br/> TODO
        <br/>N° couleur (? recup stock icon ?) 
        <br/>Créer boutons PREV et NEXT dans toolbar pour naviguer dans cette liste
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.stop="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import StockIcon from '../StockIcon.vue';
export default {
  components: { vSelect, StockIcon },
  props: {
    value: Boolean,
  },
  data() {
    return {
      newInfo: this.createNewInfo(),
      infos: [],
      crtCharacters: []
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    /* crtCharacters() {
      var t = [];
      var localChar = JSON.parse(localStorage.characters);
      for (var i in localChar) {
        t.push(localChar[i]);
      }
      return t;
    } */
  },
  methods: {
    addInfo() {
      this.$refs['quick-tag-j1'].validate(true);
      this.$refs['quick-tag-j2'].validate(true);

      if (!this.newInfo.p1.characters || !this.newInfo.p2.characters) {
        // TODO notif ou qqchose pour dire il manque info
      } else if (this.newInfo.p1.tag && this.newInfo.p2.tag) {
        console.log('.. add info ', this.newInfo);
        this.infos.push({
          id: this.infos.length + 1,
          j1: this.newInfo.p1,
          j2: this.newInfo.p2,
          // TODO phase1 & phase2
          phase: this.newInfo.phase,
        });
        this.newInfo = this.createNewInfo();
        this.$refs['quick-tag-j1'].focus();

        // TODO "InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable"
        this.$emit('quick-infos', this.infos);
      }
    },
    createNewInfo() {
      return {
        p1: {},
        p2: {},
        phase: ''
      }
    },
    updateCharacters() {
      this.infos = [];
      this.newInfo = this.createNewInfo();

      this.crtCharacters = [];
      var localChar = JSON.parse(localStorage.characters);
      for (var i in localChar) {
        this.crtCharacters.push(localChar[i]);
      }
    }
  }
};
</script>

<style>
.v-select.quick .vs__dropdown-menu {
  display: block;
  margin: 0;
  padding: 0;
  min-width: 6em;
}
.v-select.quick .vs__search {
  padding: 0;
  margin: 0;
}
.v-select.quick .vs__dropdown-toggle{
  min-height: 40px;
}
.v-select.quick .vs__dropdown-option {
  width: 5em;
}
.player1 .vs__search::placeholder,
.player1 .vs__dropdown-toggle,
.player1 .vs__dropdown-menu {
  background: #FFEBEE;
}
.player2 .vs__search::placeholder,
.player2 .vs__dropdown-toggle,
.player2 .vs__dropdown-menu {
  background: #E3F2FD;
}
</style>