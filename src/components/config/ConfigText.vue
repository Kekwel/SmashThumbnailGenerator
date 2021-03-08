<template>
  <div>
    <config-text-player :i="1" :player="j1"></config-text-player>
    <config-text-player :i="2" :player="j2"></config-text-player>
  </div>
</template>

<script>
import ConfigTextPlayer from './ConfigTextPlayer.vue';
export default {
  components: { ConfigTextPlayer },
  props: {
    title: {
      type: String,
      default: "Tab",
    },
    j1: Object,
    j2: Object,
    phase1: Object,
    phase2: Object,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
  },
};
</script>