<template>
  <v-row no-gutters>
    <v-col>
      <!-- TODO Composant avec offset x, offset y, opacité, couleur ombre -->
      <v-checkbox v-model="obj.ombre" :label="title" hide-details dense></v-checkbox>

      <v-subheader style="height: 20px" class="pl-0">X</v-subheader>
      <v-slider dense v-model="obj.ombreX" :thumb-size="24" thumb-label="always" min="-50" hide-details></v-slider>
      <v-subheader style="height: 20px" class="pl-0">Y</v-subheader>
      <v-slider dense v-model="obj.ombreY" :thumb-size="24" thumb-label="always" min="-50" hide-details></v-slider>

<!--       <v-subheader style="height: 20px" class="pl-0">Opacité {{ obj.ombreOpacity }}</v-subheader>
      <v-slider dense v-model="obj.ombreOpacity" :thumb-size="24" thumb-label="always" min="0" max="1" step="0.1" hide-details></v-slider>
 -->      <v-subheader style="height: 20px" class="pl-0">{{ $t('label.blur') }} {{ obj.ombreBlur }}</v-subheader>
      <v-slider dense v-model="obj.ombreBlur" :thumb-size="24" thumb-label="always" min="0" max="1" step="0.1" hide-details></v-slider>

      <input type="color" id="head" name="head" v-model="obj.ombreColor" />
      <label for="head"> {{ obj.ombreColor }} </label><br />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    obj: Object,
    title: String,
    i: Number,
  }
};
</script>
