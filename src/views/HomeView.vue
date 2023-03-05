<script lang="ts">
import { defineComponent } from "vue";
import BaseMenu from "@/components/menu/BaseMenu.vue";

export default defineComponent({
  name: "HomeView",
  components: { BaseMenu },
});
</script>

<template>
  <div
    class="flex h-screen max-h-screen min-h-1/2 max-w-full flex-grow overflow-hidden bg-white"
  >
    <base-menu />

    <router-view class="w-full overflow-hidden" />
  </div>
</template>
