<template>
  <div>
    <!-- TODO Composant avec offset x, offset y, opacité, couleur ombre -->
    <input type="checkbox" :id="idShadow" v-model="obj.ombre" />
    <label :for="idShadow"> {{ title }}</label><br />

		<input type="range" min="-25" max="25" v-model="obj.ombreX" class="slider" :id="'offsetX' + i">
		<label :id="'offsetX' + i"> X {{ obj.ombreX }}</label><br />
		<input type="range" min="-25" max="25" v-model="obj.ombreY" class="slider" :id="'offsetY' + i">
		<label :id="'offsetY' + i"> Y {{ obj.ombreY }}</label><br />

    <input type="range" min="0" max="1" step="0.1" v-model="obj.ombreBlur" class="slider" :id="'offsetY' + i">
		<label :id="'offsetY' + i"> Flou {{ obj.ombreBlur }}</label><br />
    <input type="color" id="head" name="head" v-model="obj.ombreColor" />
    <label for="head"> Couleur {{ obj.ombreColor }} </label><br />
  </div>
</template>

<script>
export default {
  props: {
    obj: Object,
    title: String,
    i: Number,
  },
  data() {
    return {
      idShadow: "idShadow" + this.i,
			offsetX: -10,
			offsetY: 10,
    };
  },
};
</script>
