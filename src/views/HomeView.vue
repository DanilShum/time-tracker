<template>
  <div class="home">
    <div class="page">
      <base-menu />
      <router-view />
    </div>
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
.home {
  display: flex;
  height: 100vh;
  max-height: 100vh;
  min-height: 500px;
  overflow: hidden;
  max-width: 100%;
}
.page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  background-color: $sub-white;
}
</style>
