<template>
  <div class="columns is-gapless pl-2">
    <div class="column is-one-fifth">
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
          <tab title="VS"
            ><conf-player
              :j1="j1"
              :j2="j2"
              :phase1="phase1"
              :phase2="phase2"
            ></conf-player
          ></tab>
          <tab title="Texte"><conf-text :j1="j1" :j2="j2"></conf-text></tab>
          <tab title="Fond"
            ><conf-background :j1="j1" :j2="j2"></conf-background
          ></tab>
          <tab title="Par défaut"><conf-default></conf-default></tab>
        </tabs>
      </div>
      <div id="info-j1">
        <!-- Personange 2 <input v-model="j2.filename" /> <br /> -->
      </div>
      <!-- TODO component pour joueur -->
    </div>
    <div class="column">
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

export default {
  name: "Thumbnail",
  components: {
    Tab,
    Tabs,
    ConfPlayer,
    ConfText,
    ConfBackground,
    ConfDefault,
  },
  data() {
    return {
      isDisplayGrid: true,
      gridLines: [],
      grid: 40,
      canvas: "",
      j1: {},
      j2: {},
      phase1: {},
      phase2: {},
    };
  },
  mounted() {
    // le canvas
    this.canvas = new fabric.Canvas("can", {
      preserveObjectStacking: true,
    });

    this.initGridLines();

    // -- J1
    var bgOptions = {
      width: 640,
      height: 720,
      x: 0,
      y: 0,
      color: "red",
      color2: "black",
    };
    var bgTagOptions = {
      width: 640,
      height: 100,
      x: 0,
      y: 0,
      color: "cyan",
      color2: "white",
    };
    var tagOptions = { tag: "Joueur X", x: 0, y: 0, size: 40, color: "black" };
    var imgOpt = { filename: "bayonetta_00", x: 0, y: 0 };
    // tag
    var bgJ1 = new CustomRect(this.canvas, bgOptions);
    var tagJ1 = new CustomText(this.canvas, tagOptions, bgTagOptions);
    var imgJ1 = new CustomImage(this.canvas, imgOpt);

    this.j1 = new Player(this.canvas, tagJ1, imgJ1, bgJ1);

    // -- J2
    bgOptions = { width: 640, height: 720, x: 640, y: 0, color: "blue" };
    imgOpt = { filename: "marth_0_02", x: 640, y: 0 };
    bgTagOptions = { width: 640, height: 100, x: 640, y: 0, color: "salmon" };
    tagOptions = { tag: "Joueur Y", x: 640, y: 0, size: 40, color: "black" };
    // tag
    var bgJ2 = new CustomRect(this.canvas, bgOptions);
    var tagJ2 = new CustomText(this.canvas, tagOptions, bgTagOptions);
    var imgJ2 = new CustomImage(this.canvas, imgOpt);

    this.j2 = new Player(this.canvas, tagJ2, imgJ2, bgJ2);

    // le ou les phases (WF, etc)
    bgTagOptions = { width: 640, height: 100, x: 0, y: 620, color: "salmon" };
    tagOptions = { tag: "Winners", x: 0, y: 620, size: 40, color: "black" };
    this.phase1 = new CustomText(this.canvas, tagOptions, bgTagOptions);

    bgTagOptions = { width: 640, height: 100, x: 640, y: 620, color: "cyan" };
    tagOptions = { tag: "Round 1", x: 640, y: 620, size: 40, color: "black" };
    this.phase2 = new CustomText(this.canvas, tagOptions, bgTagOptions);

    this.j1.addToCanvas();
    this.j2.addToCanvas();

    this.canvas.add(this.phase1.group);
    this.canvas.add(this.phase2.group);
    // le VS

    // TODO pouvoir toggle le timestamp YT (pour voir ce qui va etre caché)
  },
  methods: {
    initGridLines: function () {
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
    exportPNG: function () {
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
    getImgChar(char) {
      var images = require.context("../assets/img/char/ult", false, /\.png$/);
      // require("../assets/img/char/$GAME/$CHARNAME_$ROW_$COL.png")
      return images("./" + char + ".png");
    },
    displayGrid() {
      console.log(".. set grid visible ", this.isDisplayGrid);
      for (let line of this.gridLines) {
        line.set("visible", this.isDisplayGrid);
        this.canvas.renderAll();
      }
    },
  },
};
</script>

<style>
.canvas-container {
  /* margin: auto; */
  margin-left: 1em;
}
</style>