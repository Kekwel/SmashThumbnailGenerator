<template>
  <div>
    Couleur fond <input v-model="j1.colorTagBg" /> <br />

    Fond <input v-model="j1.colorBg" /> <br />

    Fond 2 <input v-model="j1.color2Bg" /> <br />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>