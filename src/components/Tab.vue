<template lang="html">
  <section class="hero is-fullheight" v-show='isActive'>
    <div class="hero-body no-padding align-top">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style>
.hero .no-padding {
  padding: 0;
}
.hero .align-top {
  align-items: start !important;
}
</style>