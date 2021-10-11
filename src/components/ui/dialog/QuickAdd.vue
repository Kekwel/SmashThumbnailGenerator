<template>
  <v-dialog v-model="show" max-width="700">
    <v-card>
      <v-card-title class="headline">Ajout rapide</v-card-title>
      <v-divider class="ma-2"></v-divider>

      <v-card-text class="pa-1">
        <v-container>
          <v-row no-gutters>
            <v-col cols="3">
              <!-- J1 TAG -->
              <v-text-field :label="$t('title.player', {nb: '1'})" v-model="newInfo.p1.tag" color="red" background-color="red lighten-5" dense shaped filled hide-details single-line onClick="this.select();" />
            </v-col>
            <v-col cols="2">
              <!-- J1 CHAR -->
              <v-select :clearable=false selectOnTab class="mx-2 player1" style="width: 5.5em" :options="crtCharacters" label="name" v-model="newInfo.p1.char">
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
            <v-col cols="3">
              <!-- J2 TAG -->
              <v-text-field :label="$t('title.player', {nb: '2'})" v-model="newInfo.p2.tag" color="blue" background-color="blue lighten-5" dense shaped filled hide-details single-line onClick="this.select();" />
            </v-col>
            <v-col cols="2">
              <!-- J2 CHAR -->
              <v-select :clearable=false selectOnTab class="mx-2 player2" style="width: 5.5em" :options="crtCharacters" label="name" v-model="newInfo.p2.char">
                <template #selected-option="{ firstStockUrl }">
                  <stock-icon :width="28" :src="firstStockUrl" />
                </template>
                <template #option="option">
                  <stock-icon :width="28" :src="option.firstStockUrl" />
                </template>
              </v-select>
            </v-col>

            <v-col cols="2">
              <!-- Phase TODO select ? -->
              <v-text-field v-model="newInfo.phase" dense shaped filled hide-details onClick="this.select();" />
            </v-col>
          </v-row>
        </v-container>
        <br/>
        <button @click="addInfo">Add</button>
        
        <div v-for="info in infos" :key="info.id">
          {{ info.id }} | {{ info.p1.tag }} ({{ info.p1.char.name }}) VS {{ info.p2.tag }} ({{ info.p2.char.name }}) - {{ info.phase }}
        </div>
        N° couleur (? recup stock icon ?) 
        Lors appuie sur ENTREE ou bouton, ajoute à la liste
        Créer boutons PREV et NEXT dans toolbar pour naviguer dans cette liste
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
    crtCharacters() {
      var t = [];
      var localChar = JSON.parse(localStorage.characters);
      for (var i in localChar) {
        //console.log(localChar[i]);
        t.push(localChar[i]);
      }
      return t;
    }
  },
  methods: {
    addInfo() {
      this.infos.push({
        id: this.infos.length + 1,
        p1: this.newInfo.p1,
        p2: this.newInfo.p2,
        phase: this.newInfo.phase,
      });
      this.newInfo = this.createNewInfo();
    },
    createNewInfo() {
      return {
        p1: {},
        p2: {},
        phase: ''
      }
    }
  }
};
</script>

<style>
.v-select .vs__dropdown-menu {
  display: block;
  margin: 0;
  padding: 0;
  min-width: 6em;
}
.v-select .vs__search {
  padding: 0;
  margin: 0;
}
.v-select .vs__dropdown-option {
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