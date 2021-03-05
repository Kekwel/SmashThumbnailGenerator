<template>
  <div>
    <h1 class="title">{{ msg }}</h1>
    <thumbnail/>
  </div>
</template>

 <script>
import Thumbnail from '../components/Thumbnail.vue';

export default {
  components: { Thumbnail },
  name: "ThumbnailGen",
  props: {
    msg: String,
  },
};
</script>