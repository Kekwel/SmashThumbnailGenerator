<template>
  <v-container fluid class="pa-0" style="max-width: 100% !important;">
    <v-row no-gutters justify="center">
      <v-col cols="5" md="4" lg="3" class="b-r">
        <v-tabs dark show-arrows v-model="tab">
          <v-tab><v-icon small>mdi-account-multiple-outline</v-icon></v-tab>
          <!-- Icone VS ou "account" -->
          <v-tab><v-icon>mdi-format-text</v-icon></v-tab>
          <!-- Icone text ou font -->
          <v-tab><v-icon>mdi-format-color-fill</v-icon></v-tab>
          <!-- Icone background ou color -->
          <v-tab><v-icon>mdi-box-shadow</v-icon></v-tab>
          <!-- Image perso -->
          <v-tab><v-icon>mdi-playlist-plus</v-icon></v-tab>
          <!-- Liste composants -->
          <!-- <v-tab><v-icon>mdi-format-list-bulleted-square</v-icon></v-tab> -->
          <!-- icone cog -->
          <v-tab><v-icon>mdi-cog</v-icon></v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item eager>
            <conf-player ref="confPlayer" :j1="j1" :j2="j2" :phase1="phase1" :phase2="phase2" :characters="characters" />
          </v-tab-item>
          <v-tab-item eager>
            <conf-text ref="confTxt" :j1="j1" :j2="j2" :phase1="phase1" :phase2="phase2" :versus="versus" />
          </v-tab-item>
          <v-tab-item eager>
            <conf-background ref="confBG" :j1="j1" :j2="j2" :phase1="phase1" :phase2="phase2" />
          </v-tab-item>
          <v-tab-item eager>
            <config-shadow ref="confDef" :j1="j1" :j2="j2" :phase1="phase1" :phase2="phase2" :versus="versus" />
          </v-tab-item>
          <v-tab-item eager>
            <config-custom-img ref="confImg"/>
          </v-tab-item>
          <!-- <v-tab-item eager>
            Listing
          </v-tab-item> -->
          <v-tab-item eager>
            <conf-default ref="confSdw" :canvas="canvas"
              v-on:export-json="exportJSON" 
              v-on:import-json="importJSON" 
              v-on:import-infos="importInfos"
              v-on:display-grid="displayGrid"/>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      
      <v-col cols="7" md="8" lg="9" class="b-r thumbnail" style="overflow-x: hidden;" align-self="center">
        <div class="fabric-canvas-wrapper">
          <canvas id="can" width="1280" height="720" style="border: 1px solid black"></canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

 <script>
import { fabric } from "fabric";
import { CustomRect } from "./js/CustomRect";
import { Player } from "./js/Player";
import { CustomText } from "./js/CustomText";
import { CustomImage } from "./js/CustomImage";

import ConfPlayer from "./config/ConfigPlayer";
import ConfText from "./config/ConfigText";
import ConfBackground from "./config/ConfigBackground";
import ConfDefault from "./config/ConfigDefault";
import ConfigShadow from './config/ConfigShadow.vue';
import ConfigCustomImg from './config/ConfigCustomImg.vue';

import Stocks from "../utils/stocks"
import Utils from "../utils"
import Games from "../utils/games"

export default {
  name: "Thumbnail",
  components: {
    ConfPlayer,
    ConfText,
    ConfBackground,
    ConfDefault,
    ConfigShadow,
    ConfigCustomImg
  },
  data() {
    return {
      tab: null,
      gridLines: [],
      grid: 20,
      canvas: null,
      game: null,
      j1: {},
      charJ1: {},
      charJ2: {},
      j2: {},
      phase1: {},
      phase2: {},
      versus: {},
      characters: [],
    };
  },
  created() {
    // par defaut Ultimate
    this.game = Games.ULT;
    this.characters = Stocks.ULT;

    // -- J1
    var bgOptions = { width: 640, height: 720, x: 0, y: 0, index: 0 };
    var bgTagOptions = { width: 640, height: 75, x: 0, y: 0, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ]};
    var tagOptions = { tag: this.$t('title.player', {nb: 'X'}), x: 0, y: 20, size: 40, color: "#000000", index: 4 };
    // TODO Character unique, là on a un character pour tous les joueurs
    this.charJ1 = this.getRandomChar();
    var imgOpt = { number: 'j1', character: this.charJ1, x: 0, y: 85, index: 2 };
    // TODO class ?
    var clipPathJ1 = new fabric.Rect({ width: 640, height: 720, top: 0, left: 0, absolutePositioned: true, strokeWidth: 0 });
    // tag
    var bgJ1 = new CustomRect(this.canvas, bgOptions);
    bgJ1.rect.name = this.$t('component.player.background', {nb: '1'});
    bgJ1.rect.customParent = bgJ1;
    var tagJ1 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ1);
    tagJ1.group.name = this.$t('component.player.tag', {nb: '1'});
    tagJ1.group.customParent = tagJ1;
    var imgJ1 = new CustomImage(this.canvas, imgOpt, clipPathJ1);
    imgJ1.group.name = this.$t('component.player.char', {nb: '1'});
    imgJ1.group.customParent = imgJ1;

    this.j1 = new Player('j1', this.canvas, tagJ1, imgJ1, bgJ1);

    // -- J2
    bgOptions = { width: 640, height: 720, x: 640, y: 0, index: 1};
    bgTagOptions = { width: 640, height: 75, x: 640, y: 0, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ]};
    tagOptions = { tag: this.$t('title.player', {nb: 'Y'}), x: 640, y: 20, size: 40, color: "#000000", index: 5 };
    this.charJ2 = this.getRandomChar();
    imgOpt = { number: 'j2', character: this.charJ2, x: 640, y: 85, index: 3 };
  // TODO class ?
    var clipPathJ2 = new fabric.Rect({ width: 640, height: 720, top: 0, left: 640, absolutePositioned: true, strokeWidth: 0 });
    // tag
    var bgJ2 = new CustomRect(this.canvas, bgOptions);
    bgJ2.rect.name = this.$t('component.player.background', {nb: '2'});
    bgJ2.rect.customParent = bgJ2;
    var tagJ2 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ2);
    tagJ2.group.name = this.$t('component.player.tag', {nb: '2'});
    tagJ2.group.customParent = tagJ2;
    var imgJ2 = new CustomImage(this.canvas, imgOpt, clipPathJ2);
    imgJ2.group.name = this.$t('component.player.char', {nb: '2'});
    imgJ2.group.customParent = imgJ2;

    this.j2 = new Player('j2', this.canvas, tagJ2, imgJ2, bgJ2);

    // le VS
    bgTagOptions = { width: 1280, height: 720, x: 0, y: 0, colors: [ { id: 0, hex: "rgba(255, 0, 0, 0)" }, { id: 1, hex: "rgba(255, 0, 0, 0)" } ] };
    tagOptions = { tag: "VS", size: 99, color: "#000000", bold: true, italic: true, index: 8 };
    this.versus = new CustomText(this.canvas, tagOptions);
    this.versus.text.name = this.$t('component.versus');
    this.versus.text.customParent = this.versus;

    // le ou les phases (WF, etc)
    bgTagOptions = { width: 640, height: 75, x: 0, y: 605, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ] };
    tagOptions = { tag: "Winners", x: 0, y: 605, size: 40, color: "#000000", index: 6 };
    this.phase1 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ1);
    this.phase1.group.name = this.$t('component.phase', {nb: '1'});
    this.phase1.group.customParent = this.phase1;

    bgTagOptions = { width: 640, height: 75, x: 640, y: 605, colors: [ { id: 0, hex: "#ffffff" }, { id: 1, hex: "#ffffff" } ] };
    tagOptions = { tag: "Round 1", x: 640, y: 605, size: 40, color: "#000000", index: 7 };
    this.phase2 = new CustomText(this.canvas, tagOptions, bgTagOptions, clipPathJ2);
    this.phase2.group.name = this.$t('component.phase', {nb: '2'});
    this.phase2.group.customParent = this.phase2;
    
    window.addEventListener("resize", this.resizeCanvas);
    
    var widthscrencan = (window.innerWidth > 0) ? window.innerWidth : screen.width; // capture width screen onload
    var self = this;
    window.onload = function () {
      if (widthscrencan <= 600) {
        console.log('..xs');
      } else if (widthscrencan <= 960) {
        console.log('..sm');
        self.zoom(0.4);
      } else if (widthscrencan <= 1264) {
        console.log('..md');
        self.zoom(0.5);
      } else if (widthscrencan <= 1500) {
        console.log('..md bis');
        self.zoom(0.75);
      } else if (widthscrencan <= 1904) {
        console.log('..lg');
      } else {
        console.log('..xl');
      }
    };

    console.log(this.$options.name + ' component succesfully created');
  }, 
  mounted() {
    this.canvas = new fabric.Canvas("can", {
      preserveObjectStacking: true,
      strokeWidth: 0,
    });
    document.getElementById("can").fabric = this.canvas;
    
    // le canvas
    this.canvas.on({
      'object:moving': function(e) {
        e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        e.target.opacity = 1;
      }
    });
    Utils.initCenteringGuidelines(this.canvas);
    Utils.initAligningGuidelines(this.canvas);
    //this.initGridLines();
    ///this.displayGrid(false);

    this.j1.canvas = this.canvas;
    this.j2.canvas = this.canvas;
    this.versus.canvas = this.canvas;
    this.phase1.canvas = this.canvas;
    this.phase2.canvas = this.canvas;
    // desactive shadow tag
    this.j1.ombreTag = false;
    this.j2.ombreTag = false;
    this.phase1.ombre = false;
    this.phase2.ombre = false;

    this.j1.addToCanvas();
    this.j2.addToCanvas();

    // update direction bg J2
    this.j2.bg.colorDirection = 'bottomleft';

    // this.canvas.add(this.versus.group);
    this.canvas.add(this.versus.text);
    this.versus.text.center();
    this.versus.ombreColor = '#ffffff';
    this.versus.ombreBlur = 0;
    this.versus.ombreX = 5;
    this.versus.ombreY = 5;
    
    this.canvas.add(this.phase1.group);
    this.canvas.add(this.phase2.group);

    this.$refs.confPlayer.selectChar(this.game, this.charJ1, this.charJ2);
    this.$refs.confBG.randomColor();
    this.$refs.confTxt.updateCustomFont();
    this.$refs.confImg.updateCanvas(this.canvas);
    console.log(this.$options.name + ' component succesfully mounted');
  }, methods: {
    initGridLines() {
      // create grid
      for (var i = 0; i < 1280 / this.grid; i++) {
        var line = new fabric.Line([i * this.grid, 0, i * this.grid, 1280], {
          stroke: "#ccc",
          opacity: 0.35,
          selectable: false,
        });
        var lineH = new fabric.Line([0, i * this.grid, 1280, i * this.grid], {
          stroke: "#ccc",
          opacity: 0.35,
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
    zoom(zoomVal) {
      this.canvas.setZoom(zoomVal);
      this.canvas.setWidth(this.canvas.width * this.canvas.getZoom());
      this.canvas.setHeight(this.canvas.height * this.canvas.getZoom());
      this.canvas.renderAll();
    },
    exportPNG() {
      // recup zoom courant
      var zoom = this.canvas.getZoom();
      // format max miniature
      this.canvas.setWidth(1280);
      this.canvas.setHeight(720);
      this.canvas.setZoom(1);
      this.canvas.renderAll();

      console.log("Export PNG..");
      let tagJ1 = this.j1.tag;
      let tagJ2 = this.j2.tag;
      let phase = this.phase1.smallTxt + this.phase2.smallTxt;

      var link = document.createElement("a");
      link.download = phase + "_" + tagJ1 + "_vs_" + tagJ2 + ".png";
      link.href = this.canvas.toDataURL("png");
      var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      !link.dispatchEvent(evt);

      // on remet le canvas comme on l'a eu au début
      this.canvas.setZoom(zoom);
      this.canvas.setWidth(this.canvas.width * this.canvas.getZoom());
      this.canvas.setHeight(this.canvas.height * this.canvas.getZoom());
      this.canvas.renderAll();
    },
    displayGrid(val) {
      console.log(".. set grid visible ", val);
      for (let line of this.gridLines) {
        line.set("visible", val);
        this.canvas.renderAll();
      }
    },
    getRandomChar() {
      return Utils.getRandomChar(this.game);
    },
    resizeCanvas() {
      var widthscrencan = (window.innerWidth > 0) ? window.innerWidth : screen.width; // capture width screen onload
      var zoom = 1;
      if (widthscrencan <= 960)
        zoom = 0.4;
      else if (widthscrencan <= 1264)
        zoom = 0.5;
      else if (widthscrencan <= 1500)
        zoom = 0.75;

      this.canvas.setZoom(zoom);
      this.canvas.setWidth(1280 * zoom);
      this.canvas.setHeight(720 * zoom);
      this.canvas.renderAll();
    },
    exportJSON() {
      console.log(".. export JSON");
      var item = {}
      // j1
      item.j1 = this.j1.toJSON();
      // j2
      item.j2 = this.j2.toJSON();
      // phase1
      item.phase1 = this.phase1.toJSON();
      // phase2
      item.phase2 = this.phase2.toJSON();
      // vs
      item.vs = this.versus.toJSON();

      // custom img
      if (this.$refs.confImg.images) {
        item.images = [];
        for (let img of this.$refs.confImg.images) {
          let itemImg = {};
          itemImg.name = img.name;
          itemImg.index = this.$refs.confImg.crtIndex(img);
          itemImg.data = img.toDataURL();
          itemImg.height = img.height;
          itemImg.width = img.width;
          itemImg.x = img.left;
          itemImg.y = img.top;
          itemImg.angle = img.angle;
          
          itemImg.scale = {};
          itemImg.scale.x = img.scaleX;
          itemImg.scale.y = img.scaleY;

          item.images.push(itemImg);
        }
      }

      this.download_file('export.txt', JSON.stringify(item))
    },
    download_file(name, contents, mime_type) {
        mime_type = mime_type || "text/plain";

        var blob = new Blob([contents], {type: mime_type});

        var dlink = document.createElement('a');
        dlink.download = name;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function() {
            // revokeObjectURL needs a delay to work properly
            var that = this;
            setTimeout(function() {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
    },
    importJSON(file) {
      var reader = new FileReader();
      var self = this;

      reader.onload = function(event) {
        var jsonObj = JSON.parse(event.target.result);

        self.importInfos(jsonObj);
      }

      reader.readAsText(file);
    },
    importInfos(jsonObj) {
      // TODO import avec plusieurs characters
      // on remove si plusieurs characters
      if (this.j1.charArray.length > 1)
        this.j1.removeImg();
      if (this.j2.charArray.length > 1)
        this.j2.removeImg();

      // j1
      if (jsonObj.j1)
        this.setPlayerInfo(this.j1, jsonObj.j1);
      // j2
      if (jsonObj.j2)
        this.setPlayerInfo(this.j2, jsonObj.j2);
      // phase1
      if (jsonObj.phase1)
        this.setTextInfos(this.phase1, jsonObj.phase1);
      // phase2
      if (jsonObj.phase2)
        this.setTextInfos(this.phase2, jsonObj.phase2);
      // versus
      if (jsonObj.vs)
        this.setTextInfos(this.versus, jsonObj.vs);
      // custom images
      if (jsonObj.images)
        this.addCustomImages(jsonObj.images);
    },
    setPlayerInfo(player, infoPlayer) {
        // tag
      if (infoPlayer.tag)
        this.setTextInfos(player.myTag, infoPlayer.tag);
      
        // bg
      if (infoPlayer.bg)
        this.setBgInfos(player.bg, infoPlayer.bg);
      
        // characters
      if (infoPlayer.characters) {
        if (infoPlayer.characters.url)
          player.filename = infoPlayer.characters.url;
        this.setCharInfos(player.firstCharacter, infoPlayer.characters);
      }
    },
    setTextInfos(text, infoText) {
      text.index = infoText.index;
      // text.tag = infoText.text.value // pas besoin
      if (infoText.text) {
        if (typeof infoText.text.x !== 'undefined') text.x = infoText.text.x;
        if (typeof infoText.text.y !== 'undefined') text.y = infoText.text.y;
        if (infoText.text.fontSize) text.size = infoText.text.fontSize;
        if (infoText.text.fill) text.color = infoText.text.fill;
        if (infoText.text.font) text.font = infoText.text.font;
        if (infoText.text.fontWeight) text.bold = infoText.text.fontWeight === "bold";
        if (infoText.text.fontStyle) text.italic = infoText.text.fontStyle === "italic";
      }

      if (typeof infoText.angle !== 'undefined') {
        text.angle = infoText.angle;
        // pour X raison, ca ne se met à jour que si "bold" ou "italic", alors on coche/décoche
        text.bold = !text.bold;
        text.bold = !text.bold;
      }
          // bg
      // TODO certaine prop sur group ?
      if (infoText.bg) {
        /* text.bgTag.width = infoText.bg.width;
        text.bgTag.height = infoText.bg.height; */
        /* text.group.width = infoText.bg.width;
        text.group.height = infoText.bg.height; */
        if (infoText.bg.scale) {
          let scalex = infoText.bg.scale.x;
          let scaley = infoText.bg.scale.y;
          text.group.scaleX = scalex;
          text.group.scaleY = scaley;
          text.text.scaleX = text.group.width / (text.group.width * scalex);
          text.text.scaleY = text.group.height / (text.group.height * scaley);
        }
        //text.bgTag.x = infoText.bg.x; // pas besoin
        //text.bgTag.y = infoText.bg.y; // pas besoin
        if (infoText.bg.gradient && infoText.bg.gradient.colors) text.bgTag.colors = infoText.bg.gradient.colors;
        if (infoText.bg.colorDirection) text.bgTag.colorDirection = infoText.bg.colorDirection.colorDirection;

        text.group.setCoords();
      } else {
        if (infoText.scale) {
          let scalex = infoText.scale.x;
          let scaley = infoText.scale.y;
          text.text.scaleX = scalex;
          text.text.scaleY = scaley;
        }
      }

      if (infoText.text.alignmentX) 
        text.align(infoText.text.alignmentX);
      if (infoText.text.alignmentY) 
        text.align(null, infoText.text.alignmentY);

          // shadow
      if (infoText.shadow) {
        text.ombre = true;
        if (infoText.shadow.color) text.ombreColor = infoText.shadow.color;
        if (typeof infoText.shadow.blur !== 'undefined') text.ombreBlur = infoText.shadow.blur;
        if (typeof infoText.shadow.offsetX !== 'undefined') text.ombreX = infoText.shadow.offsetX;
        if (typeof infoText.shadow.offsetY !== 'undefined') text.ombreY = infoText.shadow.offsetY;
        // TODO opacity ?
      } else {
        text.ombre = false;
      }
    },
    setBgInfos(bg, infoBg) {
      if (infoBg.width) bg.width = infoBg.width;
      if (infoBg.height) bg.height = infoBg.height;
      if (typeof infoBg.x !== 'undefined') bg.x = infoBg.x;
      if (typeof infoBg.y !== 'undefined') bg.y = infoBg.y;
      if (infoBg.gradient && infoBg.gradient.colors) bg.colors = infoBg.gradient.colors;
      if (infoBg.colorDirection) bg.colorDirection = infoBg.colorDirection;
    },
    setCharInfos(character, infoCharacter) {
      if (infoCharacter.index) character.index = infoCharacter.index;
      if (typeof infoCharacter.angle !== 'undefined') character.group.angle = infoCharacter.angle;
      if (typeof infoCharacter.x !== 'undefined') character.x = infoCharacter.x;
      if (typeof infoCharacter.y !== 'undefined') character.y = infoCharacter.y;
      
      if (infoCharacter.scale) {
        let scalex = infoCharacter.scale.x;
        let scaley = infoCharacter.scale.y;
        character.group.scaleX = scalex;
        character.group.scaleY = scaley;

        /* text.text.scaleX = text.group.width / (text.group.width * scalex);
        text.text.scaleY = text.group.height / (text.group.height * scaley); */
      }
      // TODO flip ?
      // TODO character ?
      if (infoCharacter.shadow) {
        if (infoCharacter.shadow.active) character.ombre = infoCharacter.shadow.active;
        if (typeof infoCharacter.shadow.ombreX !== 'undefined') character.ombreX = infoCharacter.shadow.x;
        if (typeof infoCharacter.shadow.ombreY !== 'undefined') character.ombreY = infoCharacter.shadow.y;
        if (typeof infoCharacter.shadow.blur !== 'undefined') character.blur = infoCharacter.shadow.blur;
        if (infoCharacter.shadow.ombreColor) character.ombreColor = infoCharacter.shadow.color;
      } 
    },
    addCustomImages(images) {
      for (let img of images) {
        let imgTag = document.createElement('img');
        imgTag.id = 'tmp-img'
        imgTag.src = img.data;
        document.getElementById('app').appendChild(imgTag);

        var imgInstance = new fabric.Image(imgTag, {
          left: img.x,
          top: img.y,
          height: img.height * img.scale.y,
          width: img.width * img.scale.x,
          // TODO angle ? a cause de l'export en base64
          /* angle: img.angle, */
          /* scaleX: img.scale.x,
          scaleY: img.scale.y */
        });
        /* imgInstance.scaleToWidth(img.width);
        imgInstance.scaleToHeight(img.height); */
        this.canvas.add(imgInstance);
        this.canvas.renderAll();
        imgInstance.setCoords();

        imgInstance.name = img.name;
        imgInstance.id = Date.now();
        this.$refs.confImg.putImage(imgInstance);
        this.$refs.confImg.goToIndex(imgInstance, img.index);

        document.getElementById('tmp-img').remove();
      }
    },
    updateGame(game) {
      if (this.j1.charArray.length > 1)
        this.j1.removeImg();
      if (this.j2.charArray.length > 1)
        this.j2.removeImg();
      
      this.game = game;
      switch (game.code) {
        case 'ult':
          this.characters = Stocks.ULT;
          break;
        case 'melee':
          this.characters = Stocks.MELEE
          break;
        case 'pplus':
          this.characters = Stocks.PPLUS
          break;
        case 'roa':
          this.characters = Stocks.ROA
          break;
        default:
          this.characters = [];
      }
      this.$refs.confPlayer.updateGame(game);
    }
  },
};
</script>

<style>
/* .canvas-container {
  margin: auto;
  margin-left: 1em;
} */
.box {
  margin-left: 1em;
}
.b-r {
  height: 94vh;
  overflow: auto;
}
.thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1E1E1E;
}
.fabric-canvas-wrapper {
  box-shadow: 10px 5px 5px black;
}
</style>