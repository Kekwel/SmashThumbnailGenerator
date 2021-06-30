<template>
  <div class="text-h6 ml-4 title-overflow">
    {{ title }}
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-if="tooltip" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    tooltip : String,
  }
};
</script>

<style>
.title-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>