<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card min-height="50vh">
      <v-card-title ref="quick-title" class="headline justify-space-between">
        {{ $t('title.quickAdd') }}
        <div style="width: 25em">
          <v-text-field v-model="eventSlug" color="teal" background-color="teal lighten-5"
                        ref="eventSlugSmashgg" label="Import from SmashGG" 
                        :rules="[() => !!eventSlug || $t('tooltip.help.import.smashgg'),
                                 () => /^https:\/\/smash.gg\/tournament\//.test(eventSlug) || $t('tooltip.help.import.smashgg')]"
                        :hint="$t('tooltip.help.import.smashgg')" hide-details="auto"
                        dense >
              <template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="teal" small icon 
                      :style="{ display: loadingSmashgg ? 'none' : ''}"
                      @click="importSmashGG">
                      <v-icon v-on="on">
                        mdi-import
                      </v-icon>
                    </v-btn>
                    <v-progress-circular indeterminate color="teal" :width="3" :size="loadingSmashgg ? 20 : 0"
                      :style="{ display: loadingSmashgg ? '' : 'none'}">
                    </v-progress-circular>
                  </template>
                  {{ $t('tooltip.help.import.smashgg') }}
                </v-tooltip>
              </template>
          </v-text-field>
        </div>
        <v-btn color="red" small icon style="align-self: center;" @click.stop="show = false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="ma-2"></v-divider>

      <v-card-text class="pa-1">
        <v-container>
          <v-row no-gutters>
            <!-- Phase -->
            <v-col cols="2" class="mr-2 d-flex align-center">
              <v-select ref="quick-phase" class="quick-phase" :clearable=false selectOnTab :options="phases" label="name" v-model="newInfo.phase" >
                <template #selected-option="{ value }">
                  {{ value }}
                </template>
                <template #option="{ name }">
                  {{ name }}
                </template>
              </v-select>
              <!-- <v-combobox label="Phase" :items="phases" @keyup.enter="addInfo" v-model="newInfo.phase" :filter="filterPhase"
                          dense filled outlined hide-details>
                <template v-slot:selection="{ item }">
                  {{ item.value }}
                </template>
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
              </v-combobox> -->
            </v-col>

            <div class="text-button d-flex align-center">|</div>

            <v-col cols="3" class="mx-2 d-flex align-center">
              <!-- J1 TAG -->
              <v-text-field ref="quick-tag-j1" :rules="[() => !!newInfo.p1.tag || '']"
                :label="$t('title.player', {nb: '1'})" v-model="newInfo.p1.tag"
                color="red" background-color="red lighten-5" dense outlined filled hide-details required onClick="this.select();" @keyup.enter="addInfo" />
            </v-col>
            <v-col cols="1" class="mr-2">
              <!-- J1 CHAR -->
              <v-select ref="quick-char-j1" :clearable=false selectOnTab class="player1 quick" 
                        :options="crtCharacters" label="name" v-model="newInfo.p1.characters">
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

              <!-- <div v-if="newInfo.p1.characters"> -->
                <v-select ref="quick-color-j1" :clearable=false selectOnTab class="mt-2 player1 quick" 
                          :options="playerColorChar(this.newInfo.p1)" label="name" v-model="newInfo.color.j1">
                  <template #selected-option="{ row, col }">
                    <div class="stock-icon-selected">
                      <div :style="stockStyles(newInfo.p1.characters, row, col)"></div>
                    </div>
                  </template>
                  <template #option="{ row, col }">
                    <div class="stock-icon-selected">
                      <div :style="stockStyles(newInfo.p1.characters, row, col)"></div>
                    </div>
                  </template>
                </v-select>
              <!-- </div> -->
            </v-col>

            <div class="text-button d-flex align-center">VS</div>
            
            <v-col cols="3" class="mx-2 d-flex align-center">
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

              <!-- <div v-if="newInfo.p2.characters"> -->
                <v-select ref="quick-color-j2" :clearable=false selectOnTab class="mt-2 player2 quick" 
                          :options="this.playerColorChar(this.newInfo.p2)" label="name" v-model="newInfo.color.j2">
                  <template #selected-option="{ row, col }">
                    <div class="stock-icon-selected">
                      <div :style="stockStyles(newInfo.p2.characters, row, col)"></div>
                    </div>
                  </template>
                  <template #option="{ row, col }">
                    <div class="stock-icon-selected">
                      <div :style="stockStyles(newInfo.p2.characters, row, col)"></div>
                    </div>
                  </template>
                </v-select>
              <!-- </div> -->
            </v-col>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-2" dark x-small fab color="success" style="align-self: center;" @click="addInfo" v-hotkey="keymap" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus-thick</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('tooltip.btn.add') }} : <kbd>Ctrl</kbd> + <kbd>Enter</kbd></span>
            </v-tooltip>

          </v-row>
        </v-container>
        
        <v-divider class="my-2"/>
        
        <!-- RECAP ou README ? -->
        <v-card class="ml-2" tile v-if="infos.length !== 0">
          <v-list-item v-for="info in infos" :key="info.id" dense>
            <v-list-item-content class="py-1" style="border-top: 1px solid black">
              <v-list-item-title>
                <v-container class="pa-0">
                  <v-row no-gutters>
                    <v-btn class="mr-2" small icon color="pink" style="align-self: center;" @click="deleteInfo(info)">
                    <v-icon>mdi-minus-box</v-icon>
                    </v-btn>
                    <!-- <div class="text-h6">{{ info.id }} | </div>  -->
                    <v-col cols="5" class="d-flex align-center">
                        <div :style="stockStyles(info.j1.characters, info.j1.characters.row, info.j1.characters.col)"></div>
                        <span class="text-body-1 mx-2">{{ info.j1.tag }}</span>
                    </v-col>
                    <div class="text-button mr-4">VS</div> 
                    <v-col cols="5" class="d-flex align-center">
                        <div :style="stockStyles(info.j2.characters, info.j2.characters.row, info.j2.characters.col)"></div>
                        <span class="text-body-1 mx-2">{{ info.j2.tag }}</span>
                    </v-col>

                    <div class="text-button ml-2">- {{ info.phase }}</div>
                  </v-row>
                </v-container>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card class="ml-2" tile v-else height="16em">
          <v-card-title ref="quick-title" class="headline font-italic" style="color: #9E9E9E">
            {{ $t('title.shortcut') }}
          </v-card-title>
          <v-card-text>
              <div>
                <kbd><v-icon small color="white">mdi-keyboard-tab</v-icon> Tab</kbd> : {{ $t('label.shortcut.tab') }}
              </div>
              <div>
                <kbd>Ctrl</kbd> + <kbd>Enter</kbd> : {{ $t('label.shortcut.ctrlEnter') }}
              </div>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import StockIcon from '../StockIcon.vue';
import { cloneDeep } from 'lodash';
import smashgg from '../../../utils/rest/smashgg.js';
export default {
  components: { vSelect, StockIcon },
  props: {
    value: Boolean,
  },
  data() {
    return {
      newInfo: this.createNewInfo(),
      infos: [],
      // TODO faire autrement pour les Round
      phases: [
        {name: 'Winners Round 1', value: 'WR1'}, {name: 'Winners Round 2', value: 'WR2'}, {name: 'Winners Round 3', value: 'WR3'}, {name: 'Winners Round 4', value: 'WR4'}, {name: 'Winners Round 5', value: 'WR5'},
        {name: 'Winners Quarters', value: 'WQ'}, {name: 'Winners Semis', value: 'WS'},
        {name: 'Winners Finals', value: 'WF'},
        {name: 'Losers Round 1', value: 'LR1'}, {name: 'Losers Round 2', value: 'LR2'}, {name: 'Losers Round 3', value: 'LR3'}, {name: 'Losers Round 4', value: 'LR4'}, {name: 'Losers Round 5', value: 'LR5'},
        {name: 'Losers Quarters', value: 'LQ'}, {name: 'Losers Semis', value: 'WS'},
        {name: 'Losers Finals', value: 'LF'},  
        {name: 'Grand Finals', value: 'GF'},
        ],
      crtCharacters: [],
      crtColorChar: [],
      eventSlug: '',
      loadingSmashgg: false,
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
    keymap () {
      return {
        'ctrl+enter': this.addInfo
      }
    }
  },
  methods: {
    addInfo() {
      this.$refs['quick-tag-j1'].validate(true);
      this.$refs['quick-tag-j2'].validate(true);

      if (!this.newInfo.p1.characters || !this.newInfo.p2.characters) {
        // TODO notif ou qqchose pour dire il manque info
      } else if (this.newInfo.p1.tag && this.newInfo.p2.tag) {
        console.log('.. add info ', this.newInfo);

        let infoToPush = {
          id: this.infos.length + 1,
          j1: this.newInfo.p1,
          j2: this.newInfo.p2,
          // TODO phase1 & phase2
          phase: this.newInfo.phase.value,
          phase1: this.newInfo.phase.name.substr(0, this.newInfo.phase.name.indexOf(' ')),
          phase2: this.newInfo.phase.name.substr(this.newInfo.phase.name.indexOf(' ') + 1),
        }

        infoToPush.j1.characters.row = this.newInfo.color.j1.row;
        infoToPush.j1.characters.col = this.pad(this.newInfo.color.j1.col, 2);

        infoToPush.j2.characters.row = this.newInfo.color.j2.row;
        infoToPush.j2.characters.col = this.pad(this.newInfo.color.j2.col, 2);
        this.pushInfos(infoToPush);
      }
    },
    pushInfos(infoToPush, toEmit = true) {
      // clone deep
      this.infos.push(cloneDeep(infoToPush));
      this.newInfo = this.createNewInfo();
      //this.$refs['quick-tag-j1'].focus();
      this.$refs['quick-phase'].$refs.search.focus()
      //this.$refs['quick-title'].focus()

      if (toEmit)
        this.$emit('quick-infos', this.infos);
    },
    deleteInfo(info) {
      console.log('..delete ', info);
      // on garde tous sauf l'element a supprimer
      const crtIdx = this.infos.indexOf(info);
      if (crtIdx > -1) {
        this.infos.splice(crtIdx, 1);
        // refresh id (TODO ou autrement ?)
        for (let i = 0; i < this.infos.length; i++) {
          const crtInfo = this.infos[i];
          crtInfo.id = i + 1;
        }

        this.$emit('quick-infos', this.infos);
      }
    },
    createNewInfo() {
      return {
        p1: {
          tag: ''
        },
        color: {
          j1: {
            name: '',
            row: 0,
            col: "00"
          },
          j2: {
            name: '',
            row: 0,
            col: "00"
          }
        },
        p2: {
          tag: ''
        },
        phase: {name: 'Winners Round 1', value: 'WR1'}
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
    },
    stockStyles(crtChar, row, col) {
      return crtChar ? {
        'background-image': `url(${crtChar.allStocksUrl ?? crtChar.getAllStocksUrl()})`,
        'background-size' : `${crtChar.maxCol * 32}px ${(crtChar.maxRow) * 32}px`,
        'background-position': `${col * -32}px ${row * -32}px`,
        'height' : `32px`,
        'width' : `32px`
      } : {}
    },
    playerColorChar(player) {
      let colors = [];
      if (player?.characters) {
        for (let i = 0; i < player.characters.maxRow; i++) {
          for (let j = 0; j < player.characters.maxCol; j++) {
            colors.push({
              name: i + " " + j,
              row: i,
              col: j
            })
          }
        }
      } else {
        colors.push({name: ''})
      }
      return colors;
    },
    filterPhase(item, queryText) {
      return item.name.toLowerCase().includes(queryText.toLowerCase()) || item.value.toLowerCase().includes(queryText.toLowerCase());
    },
    async importSmashGG() {
      this.$refs['eventSlugSmashgg'].validate(true);

      if (this.eventSlug) {
        console.log('.. send post smashgg', this.eventSlug);
        this.loadingSmashgg = true;
        //smashgg.getStreamedSetsInfos("https://smash.gg/tournament/cornismash-90-ultimate-weekly-lyon/event/main-event-ultimate-singles")
        smashgg.getStreamedSetsInfos(this.eventSlug)
        .then(infosSmashgg => {
          //console.log('toAdd', infosSmashgg);
    
          // TODO tester le jeu ?
    
          let cpt = 0;
          for (const info of infosSmashgg) {
            let infoToPush = {
              id: this.infos.length + 1,
              j1: info.p1,
              j2: info.p2,
              // TODO phase1 & phase2
              phase: info.phase.value,
              phase1: info.phase.phase1,
              phase2: info.phase.phase2
            }
      
            infoToPush.j1.characters.row = 0;
            infoToPush.j1.characters.col = '00';
    
            infoToPush.j2.characters.row = 0;
            infoToPush.j2.characters.col = '00';
      
            cpt++;
            // emit qu'au dernier item
            this.pushInfos(infoToPush, cpt === infosSmashgg.length);
          }
          this.loadingSmashgg = false;
          // TODO notif ok !
        })
        .catch(err => {
          console.log(err);
          // TODO notif pourquoi error
          this.loadingSmashgg = false;
        });
      }
    },
    /* TODO UTILS */
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }
  }
};
</script>

<style>
.v-select.quick .vs__dropdown-menu,
.v-select.quick-phase .vs__dropdown-menu {
  display: block;
  margin: 0;
  padding: 0;
  min-width: 6em;
  max-height: 20em;
}
.v-select.quick .vs__search {
  padding: 0;
  margin: 0;
}
.v-select.quick .vs__dropdown-toggle {
  min-height: 40px;
}
.v-select.quick .vs__dropdown-option {
  width: 5em;
}
.v-select.quick-phase {
  width: 20em;
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