<template>
  <div>
    <!-- <img :src="getStockUrl(src)" :alt="src" width="32" /> -->
    <img :src="src" :alt="src" width="32" />
  </div>
</template>

<script>
export default {
  props: {
    src: String
  },
};
</script>

<style>
.title-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>