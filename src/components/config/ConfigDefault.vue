<template>
  <div>
    <h2>Par défaut</h2>
    Police Taille Police Couleur Gras, Italique
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    }
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>