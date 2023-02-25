<template>
  <div class="page">
    <base-menu />

    <router-view class="page-view" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseMenu from "@/components/menu/BaseMenu.vue";

export default defineComponent({
  name: "HomeView",
  components: { BaseMenu },
});
</script>
<style lang="scss">
.page {
  display: flex;
  height: 100vh;
  max-height: 100vh;
  min-height: 500px;
  overflow: hidden;
  max-width: 100%;
  flex-grow: 1;
  background-color: $sub-white;
}
.page-view {
  width: 100%;
  overflow: hidden;
}
</style>
