<template>
  <div>
    {{ j1 }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: String
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>