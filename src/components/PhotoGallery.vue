<template>
  <div
    class="row"
    v-chat-scroll
    style="height: 80vh; overflow-y: scroll; background: white; padding: 50px;"
  >
    <div
      class="col-md-3 col-sm-12 col-xs-12"
      v-for="item in serviceList"
      :key="item.download_url"
    >
      <div class="white-box" style="margin-bottom: 30px;">
        <div class="product-img">
          <img id="serviceImage" class="img-responsive" :src="item.download_url" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["serviceList"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted: function () {}
};
</script>
<style>
#serviceImage {
  width: 500px;
  height: 350px;
}
.product-img {
  text-align: center;
  position: relative;
  transition: all 1s ease;
}
</style>
