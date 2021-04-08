<template>
  <img class="mr-2" :src="src" :alt="src" :width="width" :height="height" />
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