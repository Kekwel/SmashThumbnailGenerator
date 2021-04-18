<template>
  <div class="columns is-gapless pl-2">
    <div class="column">
      <div>
        <button @click="exportPNG">PNG</button>
        <input
          type="checkbox"
          id="displayGrid"
          v-model="isDisplayGrid"
          @change="displayGrid($event)"
        />
        <label for="displayGrid">Affichage Grid</label>
        <tabs>
          <!-- TODO icon tab -->
          <tab title="VS"
            ><conf-player
              ref="confPlayer"
              :j1="j1"
              :j2="j2"
              :phase1="phase1"
              :phase2="phase2"
              :characters="characters"
            ></conf-player
          ></tab>
          <!-- Icone VS ou "account" -->
          <tab title="Texte"
            ><conf-text
              :j1="j1"
              :j2="j2"
              :phase1="phase1"
              :phase2="phase2"
            ></conf-text
          ></tab>
          <!-- Icone text ou font -->
          <tab title="Fond"
            ><conf-background
              :j1="j1"
              :j2="j2"
              :phase1="phase1"
              :phase2="phase2"
            ></conf-background
          ></tab>
          <!-- Icone background ou color -->
          <tab title="Par défaut"><conf-default></conf-default></tab>
          <!-- icone cog -->
        </tabs>
      </div>
    </div>
    <div class="column is-8i s-offset-4 mr-5">
      <canvas
        id="can"
        width="1280"
        height="720"
        style="border: 1px solid black"
      ></canvas>
    </div>
  </div>
</template>

 <script>
import { fabric } from "fabric";
import { CustomRect } from "./js/CustomRect";
import { Player } from "./js/Player";
import { CustomText } from "./js/CustomText";
import { CustomImage } from "./js/CustomImage";
import Tab from "./Tab";
import Tabs from "./Tabs";
import ConfPlayer from "./config/ConfigPlayer";
import ConfText from "./config/ConfigText";
import ConfBackground from "./config/ConfigBackground";
import ConfDefault from "./config/ConfigDefault";
import Ultimate from "../utils/ultimate"

export default {
  name: "Thumbnail",
  components: {
    Tab,
    Tabs,
    ConfPlayer,
    ConfText,
    ConfBackground,
    ConfDefault
  },
  data() {
    return {
      isDisplayGrid: false,
      gridLines: [],
      grid: 40,
      canvas: '',
      j1: {},
      charJ1: {},
      charJ2: {},
      j2: {},
      phase1: {},
      phase2: {},
      characters: [],
    };
  },
  created() {
    // par defaut Ultimate
    this.characters = Ultimate.STOCKS;

    // -- J1
    var bgOptions = { width: 640, height: 720, x: 0, y: 0 };
    var bgTagOptions = { width: 640, height: 75, x: 0, y: 10, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ]};
    var tagOptions = { tag: "Joueur X", x: 0, y: 10, size: 40, color: "#000000" };
    // TODO Character unique, là on a un character pour tous les joueurs
    this.charJ1 = this.getRandomChar();
    var imgOpt = { character: this.charJ1, x: 0, y: 0 };
    // TODO class ?
    var clipPathJ1 = new fabric.Rect({ width: 640, height: 720, top: 0, left: 0, absolutePositioned: true, strokeWidth: 0 });
    // tag
    var bgJ1 = new CustomRect(this.canvas, bgOptions);
    var tagJ1 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ1);
    var imgJ1 = new CustomImage(this.canvas, imgOpt, clipPathJ1);

    this.j1 = new Player('j1', this.canvas, tagJ1, imgJ1, bgJ1);

    // -- J2
    bgOptions = { width: 640, height: 720, x: 640, y: 0, colors: [{id: 0, hex: "#0049b9"}, {id: 1, hex: "#0086ea"}]};
    bgTagOptions = { width: 640, height: 75, x: 640, y: 35, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ]};
    tagOptions = { tag: "Joueur Y", x: 640, y: 35, size: 40, color: "#000000" };
    this.charJ2 = this.getRandomChar();
    imgOpt = { character: this.charJ2, x: 640, y: 0 };
  // TODO class ?
    var clipPathJ2 = new fabric.Rect({ width: 640, height: 720, top: 0, left: 640, absolutePositioned: true, strokeWidth: 0 });
    // tag
    var bgJ2 = new CustomRect(this.canvas, bgOptions);
    var tagJ2 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ2);
    var imgJ2 = new CustomImage(this.canvas, imgOpt, clipPathJ2);

    this.j2 = new Player('j2', this.canvas, tagJ2, imgJ2, bgJ2);

    // le ou les phases (WF, etc)
    bgTagOptions = { width: 640, height: 75, x: 0, y: 595, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ] };
    tagOptions = { tag: "Winners", x: 0, y: 595, size: 40, color: "#000000" };
    this.phase1 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ1);

    bgTagOptions = { width: 640, height: 75, x: 640, y: 630, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ] };
    tagOptions = { tag: "Round 1", x: 640, y: 630, size: 40, color: "#000000" };
    this.phase2 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ2);
    
    console.log(this.$options.name + ' component succesfully created');
  }, 
  mounted() {
    this.canvas = new fabric.Canvas("can", {
      preserveObjectStacking: true,
      strokeWidth: 0,
    });
    // le canvas
    this.initGridLines();
    this.displayGrid();

    this.j1.canvas = this.canvas;
    this.j2.canvas = this.canvas;
    this.phase1.canvas = this.canvas;
    this.phase2.canvas = this.canvas;

    this.j1.addToCanvas();
    this.j2.addToCanvas();

    this.canvas.add(this.phase1.group);
    this.canvas.add(this.phase2.group);
    // le VS

    // TODO pouvoir toggle le timestamp YT (pour voir ce qui va etre caché)
    this.$refs.confPlayer.selectChar(this.charJ1, this.charJ2);
    console.log(this.$options.name + ' component succesfully mounted');
  }, methods: {
    initGridLines() {
      // create grid
      for (var i = 0; i < 1280 / this.grid; i++) {
        var line = new fabric.Line([i * this.grid, 0, i * this.grid, 1280], {
          stroke: "#ccc",
          opacity: 0.25,
          selectable: false,
        });
        var lineH = new fabric.Line([0, i * this.grid, 1280, i * this.grid], {
          stroke: "#ccc",
          opacity: 0.25,
          selectable: false,
        });
        this.canvas.add(line);
        this.canvas.add(lineH);

        this.gridLines.push(line, lineH);
      }
      // snap to grid
      var self = this;
      this.canvas.on("object:moving", function (options) {
        if (
          Math.round((options.target.left / self.grid) * 2) % 2 == 0 &&
          Math.round((options.target.top / self.grid) * 2) % 2 == 0
        ) {
          options.target
            .set({
              left: Math.round(options.target.left / self.grid) * self.grid,
              top: Math.round(options.target.top / self.grid) * self.grid,
            })
            .setCoords();
        }
      });
    },
    exportPNG() {
      console.log("Export PNG..");
      var link = document.createElement("a");
      link.download = "toto.png";
      link.href = this.canvas.toDataURL("png");
      var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      !link.dispatchEvent(evt);
    },
    /* getImgChar(char) {
      var images = require.context("../assets/img/char/ult", false, /\.png$/);
      // require("../assets/img/char/$GAME/$CHARNAME_$ROW_$COL.png")
      return images("./" + char + ".png");
    }, */
    displayGrid() {
      console.log(".. set grid visible ", this.isDisplayGrid);
      for (let line of this.gridLines) {
        line.set("visible", this.isDisplayGrid);
        this.canvas.renderAll();
      }
    },
    getRandomChar() {
      // TODO costume
      var rand = this.characters[Math.floor(Math.random() * this.characters.length)];
      // tant que random
      while(rand._id === '?') {
        rand = this.getRandomChar();
      }
      // -- random costume
      var randCostum = this.pad(this.getRandomInt(rand.maxCol), 2);
      rand.col = randCostum;
      return rand;
    },
    /* TODO UTILS */
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  },
};
</script>

<style>
.canvas-container {
  /* margin: auto; */
  margin-left: 1em;
}
.box {
  margin-left: 1em;
}
</style>