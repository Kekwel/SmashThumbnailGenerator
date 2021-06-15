<template>
  <div class="text-h6 ml-4 title-overflow">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style>
.title-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>