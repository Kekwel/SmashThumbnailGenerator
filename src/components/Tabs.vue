<template lang="html">
  <div class="tabs is-boxed">
    <ul>
      <li v-for='(tab, index) in tabs' 
        :key='tab.title' 
        @click='selectTab(index)' 
        :class='{"is-active": (index == selectedIndex)}'>
        <a>{{ tab.title }}</a>
			</li>
    </ul> 
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
};
</script>

<style>
.tabs {
	flex-direction: column;
}
</style>