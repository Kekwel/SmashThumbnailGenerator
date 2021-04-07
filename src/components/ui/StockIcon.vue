<template>
  <!-- <div> -->
    <!-- <img :src="getStockUrl(src)" :alt="src" width="32" /> -->
    <img class="mr-2" :src="src" :alt="src" :width="width" :height="height" />
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    src: String,
    width: Number,
    height: Number,
  },
};
</script>

<style>
.title-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>