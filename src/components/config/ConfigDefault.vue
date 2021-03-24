<template>
  <div>
    <option-title :title="'Par défaut'"/>
    
    Police Taille Police Couleur Gras, Italique
  </div>
</template>

<script>
import OptionTitle from '../ui/OptionTitle.vue';
export default {
  components: { OptionTitle },
  props: {
    title: {
      
    OptionTitletype: String,
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
};
</script>