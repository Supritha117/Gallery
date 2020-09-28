<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/css/media.css";
export default {
  name: "App",
  beforeCreate() {
    this.$store.dispatch("fetchData")
  },
  components: {

  }
};
</script>
