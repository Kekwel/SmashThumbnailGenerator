<template>
  <div>
    <h3 class="title is-4 ml-2 mt-1 mb-2 title-overflow">
      {{ title }}
    </h3>
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